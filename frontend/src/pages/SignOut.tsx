/**
 * @file SignOut.tsx
 * @description Stateless Sign Out page that clears token and sends request to backend.
 */

import { useEffect, useState } from 'react';
import { signOut } from '../api/auth';

/**
 * SignOut component clears local token and notifies backend (optional).
 */
export default function SignOut() {
  const [message, setMessage] = useState('Signing out...');

  /**
   * Triggers on mount: sends sign-out request and clears token.
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No token found.');
      return;
    }

    signOut(token)
      .then(() => {
        localStorage.removeItem('token');
        setMessage('Signed out successfully.');
      })
      .catch(() => setMessage('Error during signout.'));
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <p>{message}</p>
    </div>
  );
}
