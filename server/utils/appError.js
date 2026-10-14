/**
 * Error with a short, user-facing title/message plus an optional fix hint.
 * `detail` holds the full diagnostic; it is logged and sent so the UI can show it on demand.
 */
export class AppError extends Error {
  constructor(title, message, { hint, detail } = {}) {
    super(message);
    this.title = title;
    this.hint = hint;
    this.detail = detail;
  }
}

const START_OVER = 'Start a new login from the Sign In page. Refreshing the callback page reuses the old code.';

// MOSIP IDA KYC-exchange codes that eSignet passes through as error_description.
const IDA_ERRORS = {
  'IDA-KYE-001': { message: 'The identity provider has no record of this login.', hint: START_OVER },
  'IDA-KYE-002': { message: 'This login expired before it was completed.', hint: START_OVER },
  'IDA-KYE-003': { message: 'This login was already completed; an authorization code can be used only once.', hint: START_OVER },
  'IDA-KYE-004': { message: 'The login belongs to a different OIDC client.', hint: 'Check that CLIENT_ID matches REACT_APP_CLIENT_ID.' },
  'IDA-KYE-006': { message: 'No partner policy is configured for this client.', hint: 'Ask the eSignet/IDA admin to map a KYC exchange policy to the partner.' },
};

const describeUpstream = (data) => {
  if (!data) return undefined;
  if (typeof data === 'string') return data;
  return data.error_description || data.error || JSON.stringify(data);
};

/** Build the JSON body for a failed request: { title, message, hint?, detail? }. */
export const toErrorResponse = (err, fallbackTitle) => {
  if (err instanceof AppError) {
    return { title: err.title, message: err.message, hint: err.hint, detail: err.detail };
  }
  const upstream = describeUpstream(err.response?.data);
  const known = IDA_ERRORS[err.response?.data?.error_description];
  return {
    title: fallbackTitle,
    message: known?.message || upstream || err.message,
    hint: known?.hint,
    detail: err.response ? `HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}` : err.stack,
  };
};
