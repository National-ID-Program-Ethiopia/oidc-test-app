import React from 'react';
import { Link } from 'react-router-dom';
import './LoanEligibility.css';

const LOANS = [
  {
    title: 'Home Loan',
    icon: 'fa-home',
    gradient: 'linear-gradient(45deg, #28a745, #20c997)',
    status: 'eligible',
    amount: 'Up to 2,500,000 ETB',
    rate: 'Interest Rate: 12.5% per annum',
    features: ['Up to 20 years repayment', 'Flexible payment options', 'No prepayment penalties', 'Property insurance included'],
  },
  {
    title: 'Business Loan',
    icon: 'fa-briefcase',
    gradient: 'linear-gradient(45deg, #17a2b8, #6f42c1)',
    status: 'eligible',
    amount: 'Up to 1,500,000 ETB',
    rate: 'Interest Rate: 14.5% per annum',
    features: ['Up to 5 years repayment', 'Quick approval process', 'Business consultation included', 'Flexible collateral options'],
  },
  {
    title: 'Auto Loan',
    icon: 'fa-car',
    gradient: 'linear-gradient(45deg, #dc3545, #c82333)',
    status: 'not-eligible',
    amount: 'Up to 800,000 ETB',
    rate: 'Interest Rate: 15.5% per annum',
    features: ['Up to 5 years repayment', 'Vehicle insurance included', 'Competitive rates', 'Quick processing'],
  },
  {
    title: 'Education Loan',
    icon: 'fa-graduation-cap',
    gradient: 'linear-gradient(45deg, #ffc107, #ff9800)',
    status: 'pending',
    amount: 'Up to 500,000 ETB',
    rate: 'Interest Rate: 10.5% per annum',
    features: ['Up to 10 years repayment', 'Deferred payment options', 'Academic performance based', 'Career guidance included'],
  },
];

const BADGES = {
  eligible: { className: 'badge-eligible', icon: 'fa-check', label: 'Eligible' },
  'not-eligible': { className: 'badge-not-eligible', icon: 'fa-times', label: 'Not Eligible' },
  pending: { className: 'badge-pending', icon: 'fa-clock', label: 'Under Review' },
};

const CRITERIA = [
  { title: 'Age Requirement', text: 'Must be between 21 and 65 years old at the time of application' },
  { title: 'Income Stability', text: 'Minimum 6 months of stable employment or business operation' },
  { title: 'Credit History', text: 'Good credit history with no recent defaults or late payments' },
  { title: 'Documentation', text: 'Complete KYC documentation and income verification required' },
];

const HELP = [
  { icon: 'fa-phone', title: 'Call Us', text: 'Speak with a loan specialist' },
  { icon: 'fa-envelope', title: 'Email Us', text: 'Get detailed information via email' },
  { icon: 'fa-comments', title: 'Live Chat', text: 'Chat with our support team' },
  { icon: 'fa-calendar', title: 'Book Appointment', text: 'Schedule a meeting with our experts' },
];

const LoanAction = ({ status }) => {
  if (status === 'eligible') {
    return (
      <button className="action-btn primary">
        <i className="fas fa-arrow-right" />{' '}
        Apply Now
      </button>
    );
  }
  if (status === 'pending') {
    return (
      <button className="action-btn secondary" disabled>
        <i className="fas fa-clock" />{' '}
        Review in Progress
      </button>
    );
  }
  return (
    <button className="action-btn secondary" disabled>
      <i className="fas fa-info-circle" />{' '}
      Requirements Not Met
    </button>
  );
};

const LoanEligibility = () => (
  <div className="cb-loan-eligibility">
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <i className="fas fa-university" />
          <h1>Capital Bank</h1>
        </div>
        <Link to="/dashboard" className="back-btn">
          <i className="fas fa-arrow-left" />{' '}
          Back to Dashboard
        </Link>
      </div>
    </header>

    <main className="main-content">
      <div className="eligibility-header">
        <div className="eligibility-icon">
          <i className="fas fa-handshake" />
        </div>
        <h2>Loan Eligibility Check</h2>
        <p>Discover your loan options and eligibility based on your profile</p>
      </div>

      <div className="loan-types">
        {LOANS.map((loan) => {
          const badge = BADGES[loan.status];
          return (
            <div key={loan.title} className={`loan-card ${loan.status}`}>
              <div className="card-header">
                <div className="card-icon" style={{ background: loan.gradient }}>
                  <i className={`fas ${loan.icon}`} />
                </div>
                <div className="card-title">{loan.title}</div>
                <span className={`eligibility-badge ${badge.className}`}>
                  <i className={`fas ${badge.icon}`} />{' '}
                  {badge.label}
                </span>
              </div>
              <div className="loan-details">
                <div className="loan-amount">{loan.amount}</div>
                <div className="loan-rate">{loan.rate}</div>
                <ul className="loan-features">
                  {loan.features.map((feature) => (
                    <li key={feature}><i className="fas fa-check" /> {feature}</li>
                  ))}
                </ul>
              </div>
              <LoanAction status={loan.status} />
            </div>
          );
        })}
      </div>

      <div className="eligibility-criteria">
        <h3 className="criteria-title">
          <i className="fas fa-list-check" />{' '}
          Eligibility Criteria
        </h3>
        <div className="criteria-grid">
          {CRITERIA.map((item) => (
            <div key={item.title} className="criteria-item">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="application-section">
        <h3>
          <i className="fas fa-rocket" />{' '}
          Ready to Apply?
        </h3>
        <p>
          Start your loan application process today. Our streamlined application takes just a few minutes
          and you'll receive a decision within 24 hours.
        </p>
        <button className="application-btn">
          <i className="fas fa-file-alt" />{' '}
          Start Loan Application
        </button>
      </div>

      <div className="help-section">
        <h3>
          <i className="fas fa-question-circle" />{' '}
          Need Help?
        </h3>
        <div className="help-grid">
          {HELP.map((item) => (
            <div key={item.title} className="help-item">
              <i className={`fas ${item.icon}`} />
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default LoanEligibility;
