# VeriFayda OIDC Integration App

This is a full-stack proof-of-concept application demonstrating **OIDC (OpenID Connect) authentication** flow using:

- A React frontend (`client/`)
- A Node.js + Express backend (`server/`)

It simulates how an app like **VeriFayda** integrates with an external identity provider (e.g., MOSIP eSignet) to authenticate users and fetch their verified user information.

---

## What is VeriFayda 2.0?

**VeriFayda 2.0** using eSignet integration enables relying parties to authenticate users and securely share user information using OpenID Connect (OIDC).  VeriFayda verifies users’ identities through secure protocols such as OIDC and provides services such as:

- User authentication
- Verified identity fetching
- Digital onboarding for relying parties

This app is a sample implementation of VeriFayda 2.0’s RP integration flow.

---

##  Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Frontend     | React (with axios & dotenv)   |
| Backend      | Express (Node.js) + axios     |
| Auth Method  | OIDC with signed JWT client assertion |
| Crypto       | JOSE (JWT signing with JWK)   |

---

##  Folder Structure

```text
oidc-test-app/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/                # React components, pages, hooks, etc.
│   ├── .env                # Frontend environment variables (REACT_APP_*)
│   └── package.json        # React app configuration and dependencies
│
├── server/                 # Node.js + Express backend
│   ├── routes/             # Route handlers (e.g., /api/token, /api/userinfo)
│   ├── utils/              # Utility functions (e.g., signed JWT generator)
│   ├── .env                # Backend environment variables
│   └── server.js           # Main Express server entry point
│
├── package.json            # Root-level scripts for dev (concurrently)
└── README.md               # Project documentation

```

---

##  How to Run the App Locally

### 1. Clone the repo

```bash
git clone https://github.com/National-ID-Program-Ethiopia/oidc-test-app.git

cd test-oidc-app
```
### 2. Setup Environment Files

``` 
server/.env

CLIENT_ID=oidc_client_id
TOKEN_ENDPOINT=https://example.com/oidc/token
USERINFO_ENDPOINT=https://example.com/oidc/userinfo
REDIRECT_URI=http://localhost:3000/callback
CLIENT_ASSERTION_TYPE=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
PRIVATE_KEY_BASE64=base64_encoded_jwk
# Encryption private JWK (use=enc), JSON or base64. When set, userinfo must be JWE and is decrypted with it;
PRIVATE_KEY_USER_INFO=your_encryption_private_jwk_base64
```



```
client/.env

REACT_APP_CLIENT_ID=oidc_client_id
REACT_APP_REDIRECT_URI=http://localhost:3000/callback

```

### 3. Install All Dependencies

From the root directory:

``` 
npm install
npm install --prefix client
npm install --prefix server
```

### 4. Run Both Frontend and Backend Concurrently

```
npm run dev
```
This runs:

React client on http://localhost:3000

Express server on http://localhost:5000

React frontend will proxy all /api/* requests to the backend using the proxy setting.

## To test the flow:

1. Visit: http://localhost:3000

2. Complete the OIDC auth flow and consent

3. The app exchanges the code for a token via /api/token

4. Then it fetches userinfo via /api/userinfo

5. Result is displayed in the app UI

##  Contributing 
PRs and suggestions welcome! For improvements, please, open an issue or contact us.