import React from 'react';
import { Link } from 'react-router-dom';
import './Transactions.css';

// daysAgo: offset from today, so the history always looks recent.
const TRANSACTIONS = [
  { kind: 'credit', icon: 'fa-arrow-down', title: 'Salary Deposit', description: 'Monthly salary from ABC Company', status: 'completed', amount: '+ETB 45,000.00', daysAgo: 0 },
  { kind: 'debit', icon: 'fa-arrow-up', title: 'Electricity Bill Payment', description: 'Monthly electricity bill - EEPCO', status: 'completed', amount: '-ETB 2,500.00', daysAgo: 1 },
  { kind: 'transfer', icon: 'fa-exchange-alt', title: 'Transfer to Savings', description: 'Monthly savings transfer', status: 'completed', amount: '-ETB 10,000.00', daysAgo: 2 },
  { kind: 'payment', icon: 'fa-credit-card', title: 'Grocery Store Purchase', description: 'Payment at Shoa Supermarket', status: 'completed', amount: '-ETB 1,250.00', daysAgo: 3 },
  { kind: 'credit', icon: 'fa-arrow-down', title: 'Interest Payment', description: 'Monthly interest on savings account', status: 'completed', amount: '+ETB 125.00', daysAgo: 4 },
  { kind: 'debit', icon: 'fa-arrow-up', title: 'ATM Withdrawal', description: 'Cash withdrawal from ATM - Bole Branch', status: 'completed', amount: '-ETB 5,000.00', daysAgo: 5 },
  { kind: 'payment', icon: 'fa-mobile-alt', title: 'Mobile Top-up', description: 'Mobile credit recharge - Ethio Telecom', status: 'pending', amount: '-ETB 200.00', daysAgo: 6 },
  { kind: 'transfer', icon: 'fa-exchange-alt', title: 'Transfer to Family', description: 'Money transfer to family member', status: 'completed', amount: '-ETB 3,000.00', daysAgo: 7 },
];

const STATUS = {
  completed: { icon: 'fa-check', label: 'Completed' },
  pending: { icon: 'fa-clock', label: 'Pending' },
};

const formatDaysAgo = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const Transactions = () => (
  <div className="cb-transactions">
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
      <div className="transactions-header">
        <div className="transactions-icon">
          <i className="fas fa-history"></i>
        </div>
        <h2>Recent Transactions</h2>
        <p>View and manage your transaction history</p>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h4>Total Income</h4>
          <div className="summary-amount positive">ETB 45,000.00</div>
          <div className="summary-period">This Month</div>
        </div>
        <div className="summary-card">
          <h4>Total Expenses</h4>
          <div className="summary-amount negative">ETB 32,500.00</div>
          <div className="summary-period">This Month</div>
        </div>
        <div className="summary-card">
          <h4>Net Balance</h4>
          <div className="summary-amount positive">ETB 12,500.00</div>
          <div className="summary-period">This Month</div>
        </div>
      </div>

      <div className="filters-section">
        <h3 className="filters-title">
          <i className="fas fa-filter"></i>{' '}
          Filter Transactions
        </h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="account">Account</label>
            <select id="account">
              <option value="">All Accounts</option>
              <option value="savings">Savings Account</option>
              <option value="checking">Checking Account</option>
              <option value="business">Business Account</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="type">Transaction Type</label>
            <select id="type">
              <option value="">All Types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="transfer">Transfer</option>
              <option value="payment">Payment</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="dateFrom">From Date</label>
            <input type="date" id="dateFrom" />
          </div>
          <div className="filter-group">
            <label htmlFor="dateTo">To Date</label>
            <input type="date" id="dateTo" />
          </div>
          <div className="filter-actions">
            <button className="filter-btn">
              <i className="fas fa-search"></i>{' '}
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div className="transactions-section">
        <div className="section-header">
          <h3 className="section-title">
            <i className="fas fa-list"></i>{' '}
            Transaction History
          </h3>
          <button className="export-btn">
            <i className="fas fa-download"></i>{' '}
            Export PDF
          </button>
        </div>
        <ul className="transactions-list">
          {TRANSACTIONS.map((tx) => (
            <li className="transaction-item" key={tx.title}>
              <div className={`transaction-icon ${tx.kind}`}>
                <i className={`fas ${tx.icon}`}></i>
              </div>
              <div className="transaction-details">
                <div className="transaction-title">{tx.title}</div>
                <div className="transaction-description">{tx.description}</div>
                <div className={`transaction-status status-${tx.status}`}>
                  <i className={`fas ${STATUS[tx.status].icon}`}></i>{' '}
                  {STATUS[tx.status].label}
                </div>
              </div>
              <div className="transaction-amount">
                <div className={`amount ${tx.kind === 'credit' ? 'credit' : 'debit'}`}>{tx.amount}</div>
                <div className="transaction-date">{formatDaysAgo(tx.daysAgo)}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="pagination">
          <button className="pagination-btn" disabled>
            <i className="fas fa-chevron-left"></i>{' '}
            Previous
          </button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">
            Next
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </main>
  </div>
);

export default Transactions;
