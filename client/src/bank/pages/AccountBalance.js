import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AccountBalance.css';

const AccountBalance = () => {
  const navigate = useNavigate();
  const comingSoon = () => navigate('/coming-soon');

  return (
    <div className="cb-account-balance">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-university"></i>
            <h1>Capital Bank</h1>
          </div>
          <Link to="/dashboard" className="back-btn">
            <i className="fas fa-arrow-left"></i>{' '}
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="main-content">
        <div className="balance-header">
          <div className="balance-icon">
            <i className="fas fa-wallet"></i>
          </div>
          <h2>Account Balances</h2>
          <p>View your account balances and manage your finances</p>
        </div>

        <div className="accounts-grid">
          <div className="account-card savings">
            <div className="card-header">
              <div className="account-info">
                <h3>Savings Account</h3>
                <div className="account-number">****1234</div>
              </div>
              <span className="account-type type-savings">
                <i className="fas fa-piggy-bank"></i>{' '}
                Savings
              </span>
            </div>
            <div className="balance-section">
              <div className="balance-amount">ETB 125,450.00</div>
              <div className="balance-label">Available Balance</div>
            </div>
            <div className="account-actions">
              <button className="action-btn primary" onClick={comingSoon}>
                <i className="fas fa-eye"></i>{' '}
                View Details
              </button>
              <button className="action-btn secondary" onClick={comingSoon}>
                <i className="fas fa-exchange-alt"></i>{' '}
                Transfer
              </button>
            </div>
          </div>

          <div className="account-card checking">
            <div className="card-header">
              <div className="account-info">
                <h3>Checking Account</h3>
                <div className="account-number">****5678</div>
              </div>
              <span className="account-type type-checking">
                <i className="fas fa-credit-card"></i>{' '}
                Checking
              </span>
            </div>
            <div className="balance-section">
              <div className="balance-amount">ETB 45,230.00</div>
              <div className="balance-label">Available Balance</div>
            </div>
            <div className="account-actions">
              <button className="action-btn primary" onClick={comingSoon}>
                <i className="fas fa-eye"></i>{' '}
                View Details
              </button>
              <button className="action-btn secondary" onClick={comingSoon}>
                <i className="fas fa-exchange-alt"></i>{' '}
                Transfer
              </button>
            </div>
          </div>

          <div className="account-card business">
            <div className="card-header">
              <div className="account-info">
                <h3>Business Account</h3>
                <div className="account-number">****9012</div>
              </div>
              <span className="account-type type-business">
                <i className="fas fa-briefcase"></i>{' '}
                Business
              </span>
            </div>
            <div className="balance-section">
              <div className="balance-amount">ETB 2,150,000.00</div>
              <div className="balance-label">Available Balance</div>
            </div>
            <div className="account-actions">
              <button className="action-btn primary" onClick={comingSoon}>
                <i className="fas fa-eye"></i>{' '}
                View Details
              </button>
              <button className="action-btn secondary" onClick={comingSoon}>
                <i className="fas fa-exchange-alt"></i>{' '}
                Transfer
              </button>
            </div>
          </div>

          <div className="account-card investment">
            <div className="card-header">
              <div className="account-info">
                <h3>Investment Account</h3>
                <div className="account-number">****3456</div>
              </div>
              <span className="account-type type-investment">
                <i className="fas fa-chart-line"></i>{' '}
                Investment
              </span>
            </div>
            <div className="balance-section">
              <div className="balance-amount">ETB 850,750.00</div>
              <div className="balance-label">Portfolio Value</div>
            </div>
            <div className="account-actions">
              <button className="action-btn primary" onClick={comingSoon}>
                <i className="fas fa-eye"></i>{' '}
                View Details
              </button>
              <button className="action-btn secondary" onClick={comingSoon}>
                <i className="fas fa-chart-line"></i>{' '}
                Invest
              </button>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <h3 className="summary-title">
            <i className="fas fa-chart-pie"></i>{' '}
            Account Summary
          </h3>
          <div className="summary-grid">
            <div className="summary-item">
              <h4>Total Balance</h4>
              <div className="amount">ETB 3,171,430.00</div>
            </div>
            <div className="summary-item">
              <h4>Available Credit</h4>
              <div className="amount">ETB 500,000.00</div>
            </div>
            <div className="summary-item">
              <h4>Monthly Income</h4>
              <div className="amount">ETB 45,000.00</div>
            </div>
            <div className="summary-item">
              <h4>Monthly Expenses</h4>
              <div className="amount negative">ETB 32,500.00</div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>
            <i className="fas fa-bolt"></i>{' '}
            Quick Actions
          </h3>
          <div className="actions-grid">
            <Link to="/coming-soon" className="quick-action-btn">
              <i className="fas fa-paper-plane"></i>{' '}
              Transfer Money
            </Link>
            <Link to="/coming-soon" className="quick-action-btn">
              <i className="fas fa-receipt"></i>{' '}
              Pay Bills
            </Link>
            <Link to="/coming-soon" className="quick-action-btn">
              <i className="fas fa-plus"></i>{' '}
              Make Deposit
            </Link>
            <Link to="/coming-soon" className="quick-action-btn">
              <i className="fas fa-minus"></i>{' '}
              Withdraw Cash
            </Link>
            <Link to="/coming-soon" className="quick-action-btn">
              <i className="fas fa-file-alt"></i>{' '}
              View Statements
            </Link>
            <Link to="/transactions" className="quick-action-btn">
              <i className="fas fa-history"></i>{' '}
              Transaction History
            </Link>
          </div>
        </div>

        <div className="security-notice">
          <h3>
            <i className="fas fa-shield-alt"></i>{' '}
            Account Security
          </h3>
          <p>
            Your accounts are protected with bank-level security measures. All transactions are monitored
            and encrypted to ensure the safety of your funds.
          </p>
          <div className="security-features">
            <div className="security-feature">
              <i className="fas fa-lock"></i>{' '}
              256-bit SSL Encryption
            </div>
            <div className="security-feature">
              <i className="fas fa-eye"></i>{' '}
              Real-time Monitoring
            </div>
            <div className="security-feature">
              <i className="fas fa-mobile-alt"></i>{' '}
              SMS Alerts
            </div>
            <div className="security-feature">
              <i className="fas fa-user-shield"></i>{' '}
              Identity Verification
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountBalance;
