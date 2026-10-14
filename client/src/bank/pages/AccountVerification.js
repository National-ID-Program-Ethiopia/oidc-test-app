import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../session';
import { startFaydaLogin } from '../fayda';
import './AccountVerification.css';

const VERIFIED_GRADIENT = 'linear-gradient(45deg, #28a745, #20c997)';
const PENDING_GRADIENT = 'linear-gradient(45deg, #ffc107, #ff9800)';

const AccountVerification = () => {
  const navigate = useNavigate();
  const user = getUser() || {};
  const faydaVerified = Boolean(user.faydaVerified);

  const checks = [
    {
      key: 'identity',
      icon: 'fa-id-card',
      title: 'Identity Verification',
      verified: faydaVerified,
      description: faydaVerified
        ? 'Your identity has been successfully verified through Fayda.'
        : 'Verify your identity with Fayda to unlock all banking services.',
      stepTitle: 'Fayda Identity Verification',
      stepDescription: faydaVerified ? 'Identity verified through Fayda system' : 'Sign in with Fayda to verify your identity',
      action: { icon: 'fa-id-card', label: 'Verify with Fayda', onClick: startFaydaLogin },
    },
    {
      key: 'email',
      icon: 'fa-envelope',
      title: 'Email Verification',
      verified: true,
      description: 'Your email address has been verified and is active.',
      stepTitle: 'Email Address Verification',
      stepDescription: 'Email address confirmed and active',
    },
    {
      key: 'phone',
      icon: 'fa-phone',
      title: 'Phone Verification',
      verified: true,
      description: 'Your phone number has been verified and is active.',
      stepTitle: 'Phone Number Verification',
      stepDescription: 'Phone number confirmed and active',
    },
    {
      key: 'documents',
      icon: 'fa-file-upload',
      title: 'Document Upload',
      verified: false,
      description: 'Please upload required documents to complete your verification.',
      stepTitle: 'Document Upload',
      stepDescription: 'Upload signature and additional KYC documents',
      action: { icon: 'fa-upload', label: 'Upload Documents', onClick: () => navigate('/profile') },
    },
  ];

  const completed = checks.filter((c) => c.verified).length;
  const percent = Math.round((completed / checks.length) * 100);

  return (
    <div className="cb-account-verification">
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
        <div className="verification-header">
          <div className="verification-icon">
            <i className="fas fa-user-shield"></i>
          </div>
          <h2>Account Verification Status</h2>
          <p>Track your account verification progress and complete any pending steps</p>
        </div>

        <div className="progress-section">
          <h3 className="progress-title">
            <i className="fas fa-chart-line"></i>{' '}
            Verification Progress
          </h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }}></div>
          </div>
          <div className="progress-text">{percent}% Complete - {completed} of {checks.length} steps verified</div>
        </div>

        <div className="verification-grid">
          {checks.map((check) => (
            <div className="verification-card" key={check.key}>
              <div className="card-header">
                <div className="card-icon" style={{ background: check.verified ? VERIFIED_GRADIENT : PENDING_GRADIENT }}>
                  <i className={`fas ${check.icon}`}></i>
                </div>
                <div className="card-title">{check.title}</div>
                {check.verified ? (
                  <span className="status-badge status-verified">
                    <i className="fas fa-check"></i>{' '}
                    Verified
                  </span>
                ) : (
                  <span className="status-badge status-pending">
                    <i className="fas fa-clock"></i>{' '}
                    Pending
                  </span>
                )}
              </div>
              <div className="card-description">{check.description}</div>
              {check.verified ? (
                <button className="action-btn primary" disabled>
                  <i className="fas fa-check"></i>{' '}
                  Completed
                </button>
              ) : (
                <button className="action-btn primary" onClick={check.action.onClick}>
                  <i className={`fas ${check.action.icon}`}></i>{' '}
                  {check.action.label}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="progress-section">
          <h3 className="progress-title">
            <i className="fas fa-list-check"></i>{' '}
            Verification Steps
          </h3>
          <ul className="verification-steps">
            {checks.map((check) => (
              <li className="verification-step" key={check.key}>
                <div className={`step-icon ${check.verified ? 'step-completed' : 'step-pending'}`}>
                  <i className={`fas ${check.verified ? 'fa-check' : 'fa-clock'}`}></i>
                </div>
                <div className="step-info">
                  <div className="step-title">{check.stepTitle}</div>
                  <div className="step-description">{check.stepDescription}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="help-section">
          <h3>
            <i className="fas fa-question-circle"></i>{' '}
            Need Help with Verification?
          </h3>
          <p>
            If you're having trouble completing your verification or have questions about the process,
            our support team is here to help you every step of the way.
          </p>
          <div className="contact-info">
            <h4>Contact Support</h4>
            <p><i className="fas fa-phone"></i> Phone: +251 11 123 4567</p>
            <p><i className="fas fa-envelope"></i> Email: support@capitalbank.et</p>
            <p><i className="fas fa-clock"></i> Hours: Monday - Friday, 8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountVerification;
