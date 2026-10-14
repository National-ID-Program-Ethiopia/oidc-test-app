import { randomUUID } from 'crypto';
import { importJWK, SignJWT } from 'jose';

export const generateSignedJwt = async () => {
  const {
    CLIENT_ID,
    TOKEN_ENDPOINT,
    PRIVATE_KEY,
    PRIVATE_KEY_BASE64
  } = process.env;

  const signingKey = PRIVATE_KEY || PRIVATE_KEY_BASE64;
  if (!signingKey) throw new Error('PRIVATE_KEY is not set in server/.env');
  const jwkJson = Buffer.from(signingKey, 'base64').toString();
  const jwk = JSON.parse(jwkJson);
  const privateKey = await importJWK(jwk, 'RS256');

  const header = { alg: 'RS256', typ: 'JWT' };
  if (jwk.kid) header.kid = jwk.kid;

  const payload = {
    iss: CLIENT_ID,
    sub: CLIENT_ID,
    aud: TOKEN_ENDPOINT
  };

  return await new SignJWT(payload)
    .setProtectedHeader(header)
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(privateKey);
};
