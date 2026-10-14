import React from "react";
import Layout from "./Layout";

export const NONCE_STORAGE_KEY = "oidc_nonce";

// 18 random digits with a non-zero lead stays below 2^63, so eSignet can read it as a Java long.
const generateNonce = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  const digits = Array.from(bytes, (b) => b % 10);
  digits[0] = (bytes[0] % 9) + 1;
  return digits.join("");
};

const SignIn = () => {
  const generateSignInUrl = (nonce) => {
    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      response_type: "code",
      scope: "openid profile email",
      acr_values: "mosip:idp:acr:generated-code mosip:idp:acr:linked-wallet mosip:idp:acr:biometrics",
      claims: '{"userinfo":{"name":{"essential":true},"phone":{"essential":true},"email":{"essential":true},"picture":{"essential":true},"gender":{"essential":true},"birthdate":{"essential":true},"address":{"essential":true}},"id_token":{}}',
      code_challenge: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
      code_challenge_method: "S256",
      display: "page",
      nonce,
      state: "ptOO76SD",
      ui_locales: "en",
    });

    return `${process.env.REACT_APP_AUTHORIZATION_ENDPOINT}?${params.toString()}`;
  };

  const startFaydaLogin = (event) => {
    event.preventDefault();
    const nonce = generateNonce();
    localStorage.setItem(NONCE_STORAGE_KEY, nonce);
    window.location.assign(generateSignInUrl(nonce));
  };

  return (
    <Layout>
      <div className="card signin">
        <div className="signin-head">
          <img src="/national-id-logo.png" alt="" />
          <h1>Welcome back</h1>
          <p>Sign in to the Fayda Mock Relying Party portal</p>
        </div>

        <a href="#fayda-login" onClick={startFaydaLogin} className="btn btn-primary">
          <img src="/national-id-logo.png" alt="" />
          Sign in with Fayda eSignet
        </a>

        <div className="divider">or use your account</div>

        <form action="/login" method="POST">
          <label className="field">
            <span>Username</span>
            <input type="text" name="username" autoComplete="username" required />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" autoComplete="current-password" required />
          </label>
          <button type="submit" className="btn btn-outline">Sign in</button>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
