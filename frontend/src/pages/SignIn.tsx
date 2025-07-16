/**
 * @file SignIn.tsx
 * @description Sign In page for user login.
 */

import { useState } from 'react';
import { signIn } from '../api/auth';
import InputField from '../components/InputField';
import { useAuth } from '../hooks/useAuth';

/**
 * SignIn component handles login via email and password.
 */
export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();

  /**
   * Handles form field updates.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Handles form submission.
   * Calls the backend API and updates auth state on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await signIn(form);

      if (response.token && response.user) {
        signin({ token: response.token, user: response.user });
      } else {
        setMessage(response.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while signing in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded transition text-white ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-red-600 text-center">{message}</p>}
    </div>
  );
}
