export const NONCE_STORAGE_KEY = 'oidc_nonce';

// 18 random digits with a non-zero lead stays below 2^63, so eSignet can read it as a Java long.
const generateNonce = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  const digits = Array.from(bytes, (b) => b % 10);
  digits[0] = (bytes[0] % 9) + 1;
  return digits.join('');
};

const buildAuthorizeUrl = (nonce) => {
  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid profile email',
    acr_values: 'mosip:idp:acr:generated-code mosip:idp:acr:linked-wallet mosip:idp:acr:biometrics',
    claims: '{"userinfo":{"name":{"essential":true},"phone":{"essential":true},"email":{"essential":true},"picture":{"essential":true},"gender":{"essential":true},"birthdate":{"essential":true},"address":{"essential":true}},"id_token":{}}',
    code_challenge: 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM',
    code_challenge_method: 'S256',
    display: 'page',
    nonce,
    state: 'ptOO76SD',
    ui_locales: 'en',
  });

  return `${process.env.REACT_APP_AUTHORIZATION_ENDPOINT}?${params.toString()}`;
};

/** Redirect the browser to eSignet. Usable directly as an onClick handler. */
export const startFaydaLogin = (event) => {
  event?.preventDefault();
  const nonce = generateNonce();
  localStorage.setItem(NONCE_STORAGE_KEY, nonce);
  window.location.assign(buildAuthorizeUrl(nonce));
};
