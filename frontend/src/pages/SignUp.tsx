/**
 * @file SignUp.tsx
 * @description Sign Up page for user registration.
 */

import { useState } from 'react';
import { signUp } from '../api/auth';
import InputField from '../components/InputField';

/**
 * SignUp component handles new user registration.
 */
export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  /**
   * Handles input value changes for controlled form fields.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Submits the form data to the backend for registration.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signUp(form);

    if (res.token) {
      localStorage.setItem('token', res.token); // Store JWT for session persistence
      setMessage('Signup successful!');
    } else {
      setMessage(res.error || 'Signup failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Name" type="text" name="name" value={form.name} onChange={handleChange} />
        <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-4">
          Create Account
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
}
