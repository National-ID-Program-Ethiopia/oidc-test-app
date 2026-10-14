import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ExchangeRates.css';

const RATE_CARDS = [
  { code: 'USD', name: 'US Dollar', icon: 'fa-dollar-sign', buy: '55.25', sell: '55.75', change: '+0.15%', trend: 'positive' },
  { code: 'EUR', name: 'Euro', icon: 'fa-euro-sign', buy: '60.50', sell: '61.00', change: '-0.25%', trend: 'negative' },
  { code: 'GBP', name: 'British Pound', icon: 'fa-pound-sign', buy: '70.25', sell: '70.75', change: '+0.35%', trend: 'positive' },
  { code: 'JPY', name: 'Japanese Yen', icon: 'fa-yen-sign', buy: '0.38', sell: '0.40', change: '0.00%', trend: 'neutral' },
  { code: 'CAD', name: 'Canadian Dollar', icon: 'fa-dollar-sign', buy: '40.50', sell: '41.00', change: '+0.20%', trend: 'positive' },
  { code: 'AUD', name: 'Australian Dollar', icon: 'fa-dollar-sign', buy: '36.75', sell: '37.25', change: '-0.10%', trend: 'negative' },
];

const TREND_ICONS = { positive: 'fa-arrow-up', negative: 'fa-arrow-down', neutral: 'fa-minus' };

const CURRENCIES = [
  ['ETB', 'Ethiopian Birr'],
  ['USD', 'US Dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'British Pound'],
  ['JPY', 'Japanese Yen'],
  ['CAD', 'Canadian Dollar'],
  ['AUD', 'Australian Dollar'],
];

// Mock conversion rates (in real implementation, these would come from an API)
const RATES = { ETB: 1, USD: 55.5, EUR: 60.75, GBP: 70.5, JPY: 0.39, CAD: 40.75, AUD: 37.0 };

const UPDATE_INTERVAL_MS = 30 * 60 * 1000;

const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

// Rates refresh every 30 minutes, so the last update is the most recent half-hour mark.
const updateTimes = () => {
  const last = new Date(Math.floor(Date.now() / UPDATE_INTERVAL_MS) * UPDATE_INTERVAL_MS);
  const next = new Date(last.getTime() + UPDATE_INTERVAL_MS);
  const day = last.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return { lastUpdated: `${day} at ${formatTime(last)}`, nextUpdate: formatTime(next) };
};

const ExchangeRates = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('ETB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);
  const { lastUpdated, nextUpdate } = updateTimes();

  const convertCurrency = () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (fromCurrency === toCurrency) {
      alert('Please select different currencies');
      return;
    }

    let converted;
    if (fromCurrency === 'ETB') {
      converted = amount / RATES[toCurrency];
    } else if (toCurrency === 'ETB') {
      converted = amount * RATES[fromCurrency];
    } else {
      // Convert from source currency to ETB, then to target currency
      const etbAmount = amount * RATES[fromCurrency];
      converted = etbAmount / RATES[toCurrency];
    }

    setResult({
      amount: `${converted.toFixed(2)} ${toCurrency}`,
      description: `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`,
    });
  };

  return (
    <div className="cb-exchange-rates">
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
        <div className="rates-header">
          <div className="rates-icon">
            <i className="fas fa-exchange-alt" />
          </div>
          <h2>Exchange Rates</h2>
          <p>Current exchange rates for major currencies to Ethiopian Birr</p>
          <div className="last-updated">
            <i className="fas fa-clock" />{' '}
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="rates-grid">
          {RATE_CARDS.map((card) => {
            const cls = card.code.toLowerCase();
            return (
              <div key={card.code} className={`rate-card ${cls}`}>
                <div className="card-header">
                  <div className={`currency-flag ${cls}`}>
                    <i className={`fas ${card.icon}`} />
                  </div>
                  <div className="currency-info">
                    <h3>{card.code}</h3>
                    <div className="currency-name">{card.name}</div>
                  </div>
                </div>
                <div className="rate-values">
                  <div className="rate-row">
                    <span className="rate-label">Buy Rate</span>
                    <span className="rate-value">ETB {card.buy}</span>
                  </div>
                  <div className="rate-row">
                    <span className="rate-label">Sell Rate</span>
                    <span className="rate-value">ETB {card.sell}</span>
                  </div>
                  <div className="rate-row">
                    <span className="rate-label">Change</span>
                    <span className={`rate-change change-${card.trend}`}>
                      <i className={`fas ${TREND_ICONS[card.trend]}`} />{' '}
                      {card.change}
                    </span>
                  </div>
                </div>
                <button className="action-btn primary">
                  <i className="fas fa-exchange-alt" />{' '}
                  Exchange Now
                </button>
              </div>
            );
          })}
        </div>

        <div className="converter-section">
          <h3 className="converter-title">
            <i className="fas fa-calculator" />{' '}
            Currency Converter
          </h3>
          <form className="converter-form" onSubmit={(e) => { e.preventDefault(); convertCurrency(); }}>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fromCurrency">From</label>
              <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {CURRENCIES.map(([code, name]) => (
                  <option key={code} value={code}>{code} - {name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="toCurrency">To</label>
              <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {CURRENCIES.map(([code, name]) => (
                  <option key={code} value={code}>{code} - {name}</option>
                ))}
              </select>
            </div>
            <button type="button" className="convert-btn" onClick={convertCurrency}>
              <i className="fas fa-exchange-alt" />{' '}
              Convert
            </button>
          </form>
          {result && (
            <div className="result-section">
              <div className="result-amount">{result.amount}</div>
              <div className="result-description">{result.description}</div>
            </div>
          )}
        </div>

        <div className="market-info">
          <h3 className="market-title">
            <i className="fas fa-chart-line" />{' '}
            Market Information
          </h3>
          <div className="market-grid">
            <div className="market-item">
              <h4>ETB Index</h4>
              <div className="value">98.5</div>
              <div className="description">Strong performance</div>
            </div>
            <div className="market-item">
              <h4>Volatility</h4>
              <div className="value">Low</div>
              <div className="description">Stable market conditions</div>
            </div>
            <div className="market-item">
              <h4>Market Status</h4>
              <div className="value">Open</div>
              <div className="description">Trading hours: 9:00 AM - 5:00 PM</div>
            </div>
            <div className="market-item">
              <h4>Next Update</h4>
              <div className="value">{nextUpdate}</div>
              <div className="description">Rates updated every 30 minutes</div>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          <h3>
            <i className="fas fa-exclamation-triangle" />{' '}
            Important Disclaimer
          </h3>
          <p>
            Exchange rates are subject to market fluctuations and may change without notice.
            The rates displayed are indicative and may vary at the time of transaction.
          </p>
          <ul>
            <li>Rates are updated every 30 minutes during business hours</li>
            <li>Final rates will be confirmed at the time of transaction</li>
            <li>Additional fees may apply for certain transactions</li>
            <li>Minimum and maximum transaction limits may apply</li>
            <li>Please contact our branches for large transactions</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ExchangeRates;
