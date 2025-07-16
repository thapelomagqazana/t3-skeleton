/**
 * @file auth.ts
 * @description API client for authentication-related HTTP requests.
 */

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

/**
 * Registers a new user by sending name, email, and password.
 */
export const signUp = async (payload: { name: string; email: string; password: string }) => {
  const res = await fetch(`${API}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
};

/**
 * Logs in a user using email and password credentials.
 */
export const signIn = async (payload: { email: string; password: string }) => {
  const res = await fetch(`${API}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
};

/**
 * Logs out a user using the provided JWT token.
 */
export const signOut = async (token: string) => {
  const res = await fetch(`${API}/auth/signout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
