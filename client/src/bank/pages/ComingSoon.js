import React from 'react';
import { Link } from 'react-router-dom';
import './ComingSoon.css';

const UPCOMING = [
  { icon: 'fa-paper-plane', label: 'Money Transfer' },
  { icon: 'fa-receipt', label: 'Bill Payment' },
  { icon: 'fa-credit-card', label: 'Card Management' },
  { icon: 'fa-headset', label: 'Customer Support' },
  { icon: 'fa-plus', label: 'Deposit Services' },
  { icon: 'fa-minus', label: 'Withdrawal Services' },
];

const ComingSoon = () => (
  <div className="cb-coming-soon">
    <div className="coming-soon-container">
      <div className="coming-soon-icon">
        <i className="fas fa-tools" />
      </div>
      <h1>Coming Soon</h1>
      <p className="subtitle">This feature is currently under development</p>

      <div className="feature-info">
        <h3>Upcoming Features</h3>
        <ul className="feature-list">
          {UPCOMING.map((item) => (
            <li key={item.label}>
              <i className={`fas ${item.icon}`} /> {item.label}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/dashboard" className="btn">
        <i className="fas fa-arrow-left" />{' '}
        Back to Dashboard
      </Link>

      <Link to="/logout" className="btn secondary">
        <i className="fas fa-sign-out-alt" />{' '}
        Logout
      </Link>

      <div className="notice">
        <i className="fas fa-info-circle" />{' '}
        We're working hard to bring you these features. Stay tuned for updates!
      </div>
    </div>
  </div>
);

export default ComingSoon;
