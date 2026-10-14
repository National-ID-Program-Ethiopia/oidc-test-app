import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as jose from 'jose';
import { NONCE_STORAGE_KEY } from '../fayda';
import { setUser, userFromClaims } from '../session';
import { toDisplayError } from '../errors';
import './Callback.css';

const API_BASE = 'http://localhost:5000/api';

const loginError = (title, message, hint, detail) => Object.assign(new Error(message), { title, hint, detail });

// An authorization code can be exchanged only once: a second /token call fails with
// IDA-KYE-003 ("KYC Token already processed"). StrictMode mounts effects twice in
// development, so both mounts share the exchange started for a given code.
const loginsByCode = new Map();

const completeLogin = async (code, expectedNonce) => {
  const { data: tokens } = await axios.post(`${API_BASE}/token`, { code });

  if (tokens.id_token) {
    const { nonce } = jose.decodeJwt(tokens.id_token);
    localStorage.removeItem(NONCE_STORAGE_KEY);
    if (!expectedNonce) {
      throw loginError(
        'Login session not found',
        'This login was not started from this browser session.',
        `Start again from the Sign In page on ${window.location.origin} (the same origin as REACT_APP_REDIRECT_URI).`,
        `id_token nonce=${nonce}, stored nonce=none`
      );
    }
    if (String(nonce) !== expectedNonce) {
      throw loginError(
        'Login verification failed',
        'The ID token does not belong to this login attempt.',
        'Sign in again from the Sign In page.',
        `expected nonce=${expectedNonce}, id_token nonce=${nonce}`
      );
    }
  }

  // The server decrypts JWE / decodes JWS and returns the claims object.
  const { data: claims } = await axios.post(`${API_BASE}/userinfo/`, { access_token: tokens.access_token });
  if (!claims || typeof claims !== 'object') {
    throw loginError('Could not load your profile', 'The userinfo response could not be read.');
  }

  const verifiedUser = userFromClaims(claims);
  setUser(verifiedUser);
  return verifiedUser;
};

const loginOnce = (code) => {
  if (!loginsByCode.has(code)) {
    loginsByCode.set(code, completeLogin(code, localStorage.getItem(NONCE_STORAGE_KEY)));
  }
  return loginsByCode.get(code);
};

const Callback = () => {
  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTimer = useRef(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (!code) {
      setError({
        title: query.get('error') ? 'Sign-in was not completed' : 'Missing authorization code',
        message: query.get('error_description') || query.get('error') || 'The callback URL has no authorization code.',
        hint: 'Start the login again from the Sign In page.',
      });
      return undefined;
    }

    let active = true;
    loginOnce(code).then(
      (verifiedUser) => active && setUserState(verifiedUser),
      (err) => {
        console.error('Fayda login failed:', err);
        if (active) setError(toDisplayError(err, 'Sign-in could not be completed'));
      }
    );
    return () => {
      active = false;
    };
  }, [location.search]);

  const redirectToDashboard = useCallback(() => {
    setRedirecting(true);
    redirectTimer.current = setTimeout(() => navigate('/dashboard'), 2000);
  }, [navigate]);

  // Auto-redirect after 10 seconds if the user doesn't click.
  useEffect(() => {
    if (!user) return undefined;
    const auto = setTimeout(redirectToDashboard, 10000);
    return () => {
      clearTimeout(auto);
      clearTimeout(redirectTimer.current);
    };
  }, [user, redirectToDashboard]);

  if (error) {
    return (
      <div className="cb-callback">
        <div className="success-container" role="alert">
          <div className="success-icon error-icon">
            <i className="fas fa-exclamation" />
          </div>
          <h1>{error.title}</h1>
          {error.message && <p className="subtitle">{error.message}</p>}

          {error.hint && (
            <div className="hint">
              <strong><i className="fas fa-wrench" /> How to fix</strong>
              {error.hint}
            </div>
          )}

          {error.detail && (
            <>
              <button type="button" className="tech-toggle" onClick={() => setShowDetail((v) => !v)}>
                {showDetail ? 'Hide technical details' : 'Show technical details'}
              </button>
              {showDetail && <pre className="tech-detail">{error.detail}</pre>}
            </>
          )}

          <button type="button" className="btn" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left" />{' '}
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="cb-callback">
        <div className="success-container verifying">
          <div className="spinner" />
          <h1>Verifying your identity</h1>
          <p className="subtitle">Completing your Fayda sign-in…</p>
        </div>
      </div>
    );
  }

  const infoItems = [
    ['Full Name', user.name],
    ['Email', user.email],
    ['Phone', user.phone],
    ['Gender', user.gender],
    ['Date of Birth', user.birthdate],
    ['Nationality', user.nationality],
  ];

  return (
    <div className="cb-callback">
      <div className="success-container">
        <div className="success-icon">
          <i className="fas fa-check" />
        </div>
        <h1>Authentication Successful!</h1>
        <p className="subtitle">Welcome to Capital Bank, {user.name}!</p>

        <div className="verified-badge">
          <i className="fas fa-user-shield" />{' '}
          Fayda Verified
        </div>

        <div className="user-info">
          <h3>Your Verified Information</h3>
          {infoItems.map(([label, value]) => (
            <div className="info-item" key={label}>
              <span className="info-label">{label}:</span>
              <span className="info-value">{value || 'N/A'}</span>
            </div>
          ))}
        </div>

        {!redirecting && (
          <button type="button" className="btn" onClick={redirectToDashboard}>
            <i className="fas fa-arrow-right" />{' '}
            Access Your Banking Dashboard
          </button>
        )}

        <div className="loading" style={redirecting ? { display: 'block' } : undefined}>
          <div className="spinner" />
          <p>Redirecting to your dashboard...</p>
        </div>

        <div className="security-notice">
          <i className="fas fa-shield-alt" />
          {' '}Your identity has been securely verified through Fayda. All your banking activities are protected with bank-level security.
        </div>
      </div>
    </div>
  );
};

export default Callback;
