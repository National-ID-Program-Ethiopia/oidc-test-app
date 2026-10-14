import { compactDecrypt, decodeJwt, decodeProtectedHeader, importJWK } from 'jose';
import { AppError } from './appError.js';

const parseJwk = (keyStr) => {
  if (!keyStr) throw new Error('Encryption/private JWK is empty');
  const raw = keyStr.trim().replace(/^['"]|['"]$/g, '');
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {
    // not plain JSON, try base64-encoded JSON below
  }
  const parsed = JSON.parse(Buffer.from(raw, 'base64').toString());
  if (!parsed || typeof parsed !== 'object') throw new Error('Decoded key is not a JWK object');
  return parsed;
};

const b64urlLength = (value) => {
  try {
    return Buffer.from(value || '', 'base64url').length;
  } catch {
    return 0;
  }
};

const keyMismatchError = (compactJwe, jwk, err) => {
  const parts = compactJwe.split('.');
  let tokenKid;
  try {
    tokenKid = decodeProtectedHeader(compactJwe).kid;
  } catch {
    tokenKid = undefined;
  }
  const encryptedKeyBytes = b64urlLength(parts[1]);
  const localKeyBytes = b64urlLength(jwk.n);
  console.error(
    `JWE decrypt failed: token_kid=${tokenKid} local_kid=${jwk.kid} ` +
    `encrypted_key_bytes=${encryptedKeyBytes} local_key_bytes=${localKeyBytes} err=${err.message}`
  );
  return new AppError(
    'Userinfo decryption failed',
    'The userinfo response was encrypted with a key that does not match PRIVATE_KEY_USER_INFO.',
    {
      hint: 'Update the eSignet client encPublicKey to the public JWK of PRIVATE_KEY_USER_INFO, then sign in again.',
      detail:
        `token kid=${tokenKid}, local kid=${jwk.kid}, ` +
        `encrypted key=${encryptedKeyBytes * 8}-bit, local key=${localKeyBytes * 8}-bit. ` +
        `Underlying: ${err.message}`,
    }
  );
};

/**
 * Decrypt eSignet/IDA nested userinfo JWE.
 * eSignet encrypts with RSA-OAEP-256 + A256GCM using the RP encryption public key.
 * Inner payload is a signed JWT (JWS).
 */
const decryptJweUserinfo = async (compactJwe) => {
  if (!process.env.PRIVATE_KEY_USER_INFO) {
    throw new AppError(
      'Decryption key missing',
      'eSignet returned encrypted userinfo, but no decryption key is configured.',
      { hint: 'Set PRIVATE_KEY_USER_INFO in server/.env and restart the server.' }
    );
  }
  const jwk = parseJwk(process.env.PRIVATE_KEY_USER_INFO);
  const { alg } = decodeProtectedHeader(compactJwe);
  try {
    const key = await importJWK(jwk, alg || 'RSA-OAEP-256');
    const { plaintext } = await compactDecrypt(compactJwe, key);
    console.log('JWE userinfo decrypted successfully');
    return new TextDecoder().decode(plaintext);
  } catch (err) {
    throw keyMismatchError(compactJwe, jwk, err);
  }
};

/**
 * Handle both eSignet userinfo formats:
 * - JWS (3 compact parts): signed JWT claims
 * - JWE (5 compact parts): encrypted nested JWT, then signed JWT claims
 * - JSON object
 */
export const decodeUserinfoToken = async (rawUserinfo) => {
  if (rawUserinfo && typeof rawUserinfo === 'object') return rawUserinfo;
  const token = (rawUserinfo || '').trim().replace(/^"|"$/g, '');
  if (!token) throw new AppError('Empty userinfo', 'eSignet returned an empty userinfo response.');

  if (token.startsWith('{')) return JSON.parse(token);

  const parts = token.split('.');
  if (parts.length === 5) {
    console.log('Userinfo is JWE; decrypting with PRIVATE_KEY_USER_INFO');
    const inner = (await decryptJweUserinfo(token)).trim().replace(/^"|"$/g, '');
    return inner.startsWith('{') ? JSON.parse(inner) : decodeJwt(inner);
  }

  if (parts.length === 3) {
    const { alg, kid } = decodeProtectedHeader(token);
    console.log(`Userinfo is JWS (alg=${alg} kid=${kid}); decoding JWT claims`);
    if (process.env.PRIVATE_KEY_USER_INFO) {
      throw new AppError(
        'Unexpected userinfo format',
        'Encrypted (JWE) userinfo was expected, but eSignet returned a signed-only (JWS) token.',
        { hint: 'Set "userinfo_response_type": "JWE" in the eSignet client additionalConfig, then sign in again.' }
      );
    }
    return decodeJwt(token);
  }

  throw new AppError('Unexpected userinfo format', `The userinfo token has ${parts.length} parts; expected 3 (JWS) or 5 (JWE).`);
};
