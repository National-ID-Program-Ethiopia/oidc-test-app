// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { clearUser } from './bank/session';
import Home from './bank/pages/Home';
import Callback from './bank/pages/Callback';
import Dashboard from './bank/pages/Dashboard';
import UnverifiedDashboard from './bank/pages/UnverifiedDashboard';
import Profile from './bank/pages/Profile';
import AccountVerification from './bank/pages/AccountVerification';
import LoanEligibility from './bank/pages/LoanEligibility';
import AccountBalance from './bank/pages/AccountBalance';
import Transactions from './bank/pages/Transactions';
import ExchangeRates from './bank/pages/ExchangeRates';
import ComingSoon from './bank/pages/ComingSoon';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    clearUser();
    navigate('/', { replace: true });
  }, [navigate]);
  return null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/unverified-dashboard" element={<UnverifiedDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account-verification" element={<AccountVerification />} />
        <Route path="/loan-eligibility" element={<LoanEligibility />} />
        <Route path="/account-balance" element={<AccountBalance />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;