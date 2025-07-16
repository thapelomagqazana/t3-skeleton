/**
 * @file SignIn.tsx
 * @description Sign In page for user login.
 */

import { useState } from 'react';
import { signIn } from '../api/auth';
import InputField from '../components/InputField';

/**
 * SignIn component handles login via email and password.
 */
export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  /**
   * Updates form state when input values change.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Submits login request and stores JWT if successful.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn(form);

    if (res.token) {
      localStorage.setItem('token', res.token); // Save token to localStorage
      setMessage('Sign-in successful!');
    } else {
      setMessage(res.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-4">
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
}
