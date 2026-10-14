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
  return {
    title: fallbackTitle,
    message: upstream || err.message,
    detail: err.response ? `HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}` : err.stack,
  };
};
