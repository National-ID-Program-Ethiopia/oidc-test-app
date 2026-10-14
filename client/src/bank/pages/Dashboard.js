import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../session';
import './Dashboard.css';

const CARDS = [
  {
    to: '/account-verification',
    icon: 'fa-check-circle',
    gradient: 'linear-gradient(45deg, #28a745, #20c997)',
    title: 'Account Verification',
    description: 'Check your account verification status and complete any pending verification steps.',
    button: 'Check Status',
  },
  {
    to: '/loan-eligibility',
    icon: 'fa-handshake',
    gradient: 'linear-gradient(45deg, #ff6b35, #f7931e)',
    title: 'Loan Eligibility',
    description: "Check if you're eligible for personal loans, home loans, or business financing.",
    button: 'Check Eligibility',
  },
  {
    to: '/account-balance',
    icon: 'fa-wallet',
    gradient: 'linear-gradient(45deg, #17a2b8, #6f42c1)',
    title: 'Account Balance',
    description: 'View your current account balance and available funds across all accounts.',
    button: 'View Balance',
  },
  {
    to: '/transactions',
    icon: 'fa-history',
    gradient: 'linear-gradient(45deg, #6c757d, #495057)',
    title: 'Recent Transactions',
    description: 'Review your recent transactions and download statements for your records.',
    button: 'View Transactions',
  },
  {
    to: '/profile',
    icon: 'fa-user-edit',
    gradient: 'linear-gradient(45deg, #e83e8c, #fd7e14)',
    title: 'Profile Management',
    description: 'Update your personal information and manage your account preferences.',
    button: 'Manage Profile',
  },
  {
    to: '/exchange-rates',
    icon: 'fa-exchange-alt',
    gradient: 'linear-gradient(45deg, #20c997, #17a2b8)',
    title: 'Exchange Rates',
    description: 'View current exchange rates for major currencies to Ethiopian Birr.',
    button: 'View Rates',
  },
];

const QUICK_ACTIONS = [
  { icon: 'fa-paper-plane', label: 'Transfer Money' },
  { icon: 'fa-receipt', label: 'Pay Bills' },
  { icon: 'fa-credit-card', label: 'Card Management' },
  { icon: 'fa-headset', label: 'Customer Support' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser() || {};
  const name = user.name || 'John Doe';
  const picture = user.picture || '';

  return (
    <div className="cb-dashboard">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-university" />
            <h1>Capital Bank</h1>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              {picture ? (
                <img
                  src={picture}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <i className="fas fa-user" />
              )}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Account Holder</div>
            </div>
            <Link to="/logout" className="logout-btn">
              <i className="fas fa-sign-out-alt" />{' '}
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="welcome-section">
          <h2>Welcome back, {name}!</h2>
          <p>Manage your finances with confidence. Your secure banking dashboard is ready.</p>
        </div>

        <div className="dashboard-grid">
          {CARDS.map((card) => (
            <div key={card.to} className="dashboard-card" onClick={() => navigate(card.to)}>
              <div className="card-header">
                <div className="card-icon" style={{ background: card.gradient }}>
                  <i className={`fas ${card.icon}`} />
                </div>
                <div className="card-title">{card.title}</div>
              </div>
              <div className="card-description">{card.description}</div>
              <button type="button" className="card-button primary">{card.button}</button>
            </div>
          ))}
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.label} to="/coming-soon" className="action-btn">
                <i className={`fas ${action.icon}`} />{' '}
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Capital Bank. All Rights Reserved. | Secure Banking with 256-bit Encryption</p>
      </footer>
    </div>
  );
};

export default Dashboard;
