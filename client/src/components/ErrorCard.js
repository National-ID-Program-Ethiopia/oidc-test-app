import React, { useState } from 'react';

/**
 * Normalize anything thrown during the login flow into { title, message, hint, detail }.
 * Server routes already respond with that shape; plain Errors and strings fall back to a generic title.
 */
export const toDisplayError = (err, fallbackTitle = 'Something went wrong') => {
  const body = err?.response?.data;
  if (body && typeof body === 'object' && (body.title || body.message || body.error)) {
    return {
      title: body.title || fallbackTitle,
      message: body.message || body.error,
      hint: body.hint,
      detail: body.detail,
    };
  }
  if (err?.title) return { title: err.title, message: err.message, hint: err.hint, detail: err.detail };
  if (err?.request && !err.response) {
    return {
      title: 'Server unreachable',
      message: 'The relying party server did not respond.',
      hint: 'Make sure the server is running on http://localhost:5000.',
    };
  }
  return { title: fallbackTitle, message: typeof err === 'string' ? err : err?.message };
};

const ErrorCard = ({ error, onRetry }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { title, message, hint, detail } = error;

  return (
    <div role="alert" className="card error-card">
      <div className="error-icon" aria-hidden="true">!</div>
      <h2>{title}</h2>
      {message && <p className="message">{message}</p>}

      {hint && (
        <div className="hint">
          <span className="hint-label">How to fix</span>
          <span>{hint}</span>
        </div>
      )}

      {detail && (
        <>
          <button type="button" className="tech-toggle" onClick={() => setShowDetail((v) => !v)}>
            {showDetail ? 'Hide technical details' : 'Show technical details'}
          </button>
          {showDetail && <pre className="tech-detail">{detail}</pre>}
        </>
      )}

      <button type="button" className="btn btn-primary" onClick={onRetry}>
        Back to sign in
      </button>
    </div>
  );
};

export default ErrorCard;
