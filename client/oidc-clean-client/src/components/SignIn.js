import React from "react";
const SignIn = () => {
  const generateSignInUrl = () => {
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
      nonce: "g4DEuje5Fx57Vb64dO4oqLHXGT8L8G7g",
      state: "ptOO76SD",
      ui_locales: "en",
    });

    return `${process.env.REACT_APP_AUTHORIZATION_ENDPOINT}?${params.toString()}`;
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to Fayda Mock Relying Party Portal</h1>
        <form action="/login" method="POST">
          <input type="text" name="username" placeholder="Username" required style={styles.input} />
          <input type="email" name="email" placeholder="Email" required style={styles.input} />
          <input type="password" name="password" placeholder="Password" required style={styles.input} />
          <button type="submit" style={styles.btn}>Sign In</button>
        </form>
        <p>or</p>
        {/* Updated link to use the dynamically generated URL */}
        <a href={generateSignInUrl()} style={styles.link}>
          Sign in with Fayda E-Signet
        </a>
      </div>
      <footer style={styles.footer}>
        &copy; 2025 National ID. All Rights Reserved.
      </footer>
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1a1a2e",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
  container: {
    backgroundColor: "#162447",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  heading: {
    marginBottom: "20px",
    color: "#f8c94e",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #f8c94e",
    backgroundColor: "#0f3460",
    color: "white",
  },
  btn: {
    backgroundColor: "#f8c94e",
    color: "#1a1a2e",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    marginTop: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  link: {
    color: "#f8c94e",
    textDecoration: "none",
    fontSize: "14px",
    marginTop: "15px",
    display: "inline-block",
  },
  footer: {
    position: "absolute",
    bottom: "10px",
    color: "white",
    fontSize: "12px",
  },
};

export default SignIn;
