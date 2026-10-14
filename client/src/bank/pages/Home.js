import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../session';
import { startFaydaLogin } from '../fayda';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  // Demo login: no backend check, the user is signed in but not Fayda-verified (same as the Django login_user view).
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = form.get('username');
    setUser({
      name: username,
      email: form.get('email'),
      phone: '+251 91 123 4567',
      gender: 'Not Specified',
      birthdate: 'Not Specified',
      nationality: 'Not Specified',
      address: 'Not Specified',
      picture: '',
      sub: `demo_${username}`,
      faydaVerified: false,
    });
    navigate('/unverified-dashboard');
  };

  return (
    <div className="cb-home">
      <div className="login-container">
        <div className="bank-logo">
          <i className="fas fa-university" />
        </div>
        <h1>Capital Bank</h1>
        <p className="subtitle">Your Trusted Financial Partner</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="btn">
            <i className="fas fa-sign-in-alt" /> Sign In
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <a href="#fayda-login" onClick={startFaydaLogin} className="fayda-btn">
          <i className="fas fa-id-card" />{' '}
          Sign in with Fayda
        </a>

        <div className="security-badge">
          <i className="fas fa-shield-alt" />{' '}
          Bank-level security with 256-bit encryption
        </div>

        <div className="features">
          <div className="feature">
            <i className="fas fa-mobile-alt" />{' '}
            Mobile Banking
          </div>
          <div className="feature">
            <i className="fas fa-credit-card" />{' '}
            Digital Cards
          </div>
          <div className="feature">
            <i className="fas fa-chart-line" />{' '}
            Investment
          </div>
          <div className="feature">
            <i className="fas fa-handshake" />{' '}
            Loans
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
