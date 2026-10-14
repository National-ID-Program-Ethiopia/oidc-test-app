import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../session';
import { startFaydaLogin } from '../fayda';
import './UnverifiedDashboard.css';

const FEATURES = [
  { kind: 'verification', icon: 'fa-check-circle', title: 'Account Verification', text: 'Complete your identity verification to access all features' },
  { kind: 'balance', icon: 'fa-wallet', title: 'Account Balance', text: 'View your account balances and financial overview' },
  { kind: 'loan', icon: 'fa-handshake', title: 'Loan Eligibility', text: 'Check your eligibility for various loan products' },
  { kind: 'transactions', icon: 'fa-history', title: 'Transactions', text: 'Review your transaction history and statements' },
  { kind: 'profile', icon: 'fa-user-edit', title: 'Profile Management', text: 'Update your personal information and preferences' },
  { kind: 'rates', icon: 'fa-exchange-alt', title: 'Exchange Rates', text: 'View current exchange rates and currency converter' },
];

const REASONS = [
  'Enhanced security for your banking activities',
  'Compliance with banking regulations',
  'Access to all premium banking features',
  'Secure identity verification through Fayda',
  'Protection against fraud and unauthorized access',
];

const UnverifiedDashboard = () => {
  const user = getUser() || {};
  const userName = user.name || 'User';

  return (
    <div className="cb-unverified-dashboard">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-university" />
            <h1>Capital Bank</h1>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user" />
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{userName}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Unverified Account</div>
            </div>
            <Link to="/logout" className="logout-btn">
              <i className="fas fa-sign-out-alt" />{' '}
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="verification-notice">
          <div className="verification-icon">
            <i className="fas fa-exclamation-triangle" />
          </div>
          <h2>Account Verification Required</h2>
          <p>To access all banking features, please verify your identity with Fayda</p>
          <a href="#fayda-login" onClick={startFaydaLogin} className="verification-btn">
            <i className="fas fa-id-card" />{' '}
            Verify with Fayda
          </a>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.kind} className="feature-card">
              <div className={`feature-icon ${feature.kind}`}>
                <i className={`fas ${feature.icon}`} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="info-section">
          <h3>
            <i className="fas fa-info-circle" />{' '}
            Why Verification is Required
          </h3>
          <ul className="info-list">
            {REASONS.map((reason) => (
              <li key={reason}>
                <i className="fas fa-check" /> {reason}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default UnverifiedDashboard;
