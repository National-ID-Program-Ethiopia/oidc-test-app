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
