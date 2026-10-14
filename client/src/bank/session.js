// Client-side stand-in for the Django session: the signed-in user lives in sessionStorage.
const USER_KEY = 'cb_user';

/**
 * Stored shape: { name, email, phone, gender, birthdate, nationality, address, picture, sub, faydaVerified }.
 * Returns null when nobody is signed in or storage is unavailable.
 */
export const getUser = () => {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setUser = (user) => {
  try {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // storage blocked: pages fall back to their demo defaults
  }
};

export const clearUser = () => {
  try {
    sessionStorage.removeItem(USER_KEY);
  } catch {
    // nothing to clear
  }
};

/** Flatten an OIDC address claim (object or string) into one line. */
export const formatAddress = (address) => {
  if (!address) return '';
  if (typeof address === 'string') return address;
  const parts = [address.street_address, address.zone, address.woreda, address.locality, address.region, address.country];
  return parts.filter(Boolean).join(', ') || address.formatted || '';
};

/** Map decoded eSignet userinfo claims to the stored user shape (mirrors the Django callback view). */
export const userFromClaims = (claims) => ({
  name: claims.name || 'N/A',
  email: claims.email || 'N/A',
  phone: claims.phone_number || claims.phone || '',
  gender: claims.gender || '',
  birthdate: claims.birthdate || '',
  nationality: claims.nationality || '',
  address: formatAddress(claims.address),
  picture: claims.picture || '',
  sub: claims.sub || 'N/A',
  faydaVerified: true,
});
