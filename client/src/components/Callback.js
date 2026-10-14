import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as jose from 'jose';
import { NONCE_STORAGE_KEY } from './SignIn';
import ErrorCard, { toDisplayError } from './ErrorCard';
import Layout from './Layout';

const Callback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Read before any await: StrictMode runs this effect twice and the first run clears the stored nonce.
    const expectedNonce = localStorage.getItem(NONCE_STORAGE_KEY);

    const fetchToken = async (code) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/token', {
            code:code
          }
        );

        const { access_token, id_token } = response.data;
        console.log("Access token:", access_token);

        if (id_token) {
          const { nonce } = jose.decodeJwt(id_token);
          localStorage.removeItem(NONCE_STORAGE_KEY);
          if (!expectedNonce) {
            throw Object.assign(new Error('This login was not started from this browser session.'), {
              title: 'Login session not found',
              hint: `Start again from the Sign In page on ${window.location.origin} (the same origin as REACT_APP_REDIRECT_URI).`,
              detail: `id_token nonce=${nonce}, stored nonce=none`,
            });
          }
          if (String(nonce) !== expectedNonce) {
            throw Object.assign(new Error('The ID token does not belong to this login attempt.'), {
              title: 'Login verification failed',
              hint: 'Sign in again from the Sign In page.',
              detail: `expected nonce=${expectedNonce}, id_token nonce=${nonce}`,
            });
          }
        }

        const userInfoResponse = await axios.post("http://localhost:5000/api/userinfo/", {
          access_token: access_token
        });

        console.log("User info response:", userInfoResponse.data);
        const decodedUserInfo = await decodeUserInfoResponse(userInfoResponse.data);
        console.log("Decoded user info:", decodedUserInfo);
        if (!decodedUserInfo) throw Object.assign(new Error('The userinfo response could not be read.'), { title: 'Could not load your profile' });

        // Store the decoded user info in state
        setUserInfo(decodedUserInfo);

      } catch (error) {
        console.error('Error fetching token or user info:', error);
        setError(toDisplayError(error, 'Sign-in could not be completed'));
      }
    };

    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      fetchToken(code);
    } else {
      setError({
        title: query.get('error') ? 'Sign-in was not completed' : 'Missing authorization code',
        message: query.get('error_description') || query.get('error') || 'The callback URL has no authorization code.',
        hint: 'Start the login again from the Sign In page.',
      });
    }

  }, [location.search]);

  const signOut = () => navigate('/');

  return (
    <Layout
      actions={userInfo && (
        <button type="button" className="btn btn-outline btn-sm" onClick={signOut}>Sign out</button>
      )}
    >
      {userInfo ? (
        <Profile user={userInfo} />
      ) : error ? (
        <ErrorCard error={error} onRetry={signOut} />
      ) : (
        <div className="loading">
          <div className="spinner" />
          Verifying your identity…
        </div>
      )}
    </Layout>
  );
};

const formatAddress = (address) => {
  if (!address) return null;
  if (typeof address === 'string') return address;
  const parts = [address.street_address, address.zone, address.woreda, address.locality, address.region, address.country];
  return parts.filter(Boolean).join(', ') || address.formatted || null;
};

const initials = (name) =>
  (name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

const Detail = ({ label, value, wide }) => (
  <div className={wide ? 'detail detail-wide' : 'detail'}>
    <dt>{label}</dt>
    <dd className={value ? undefined : 'empty'}>{value || 'Not provided'}</dd>
  </div>
);

const Profile = ({ user }) => (
  <div className="card profile">
    <div className="profile-hero">
      {user.picture ? (
        <img className="avatar" src={user.picture} alt={user.name || 'User'} />
      ) : (
        <div className="avatar">{initials(user.name)}</div>
      )}
      <div>
        <h2>{user.name || 'Unnamed user'}</h2>
        {user.email && <p>{user.email}</p>}
        <span className="badge">&#10003; Verified with Fayda</span>
      </div>
    </div>
    <dl className="details">
      <Detail label="Phone" value={user.phone_number || user.phone} />
      <Detail label="Gender" value={user.gender} />
      <Detail label="Date of birth" value={user.birthdate} />
      <Detail label="Nationality" value={user.nationality} />
      <Detail label="Address" value={formatAddress(user.address)} wide />
    </dl>
  </div>
);


const decodeUserInfoResponse = async (userinfoResponse) => {
  try {
    // The server decrypts JWE / decodes JWS and returns claims; keep a fallback for a raw JWS string.
    if (typeof userinfoResponse === 'object') return userinfoResponse;
    return jose.decodeJwt(userinfoResponse);
  } catch (error) {
    console.error('Error decoding JWT user info:', error);
    return null;
  }
};


export default Callback;
