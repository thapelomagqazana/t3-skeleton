/**
 * @file SignUp.tsx
 * @description Sign Up page for user registration.
 */

import { useState } from 'react';
import { signUp } from '../api/auth';
import InputField from '../components/InputField';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

/**
 * SignUp component handles new user registration.
 */
export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();

  /**
   * Handles input value changes for controlled form fields.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Submits the form data to the backend for registration and stores JWT.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signUp(form);

      if (res.token && res.user) {
        signin({ token: res.token, user: res.user }); // Set global auth state and redirect
        toast.success('Account created successfully!');
      } else {
        toast.error(res.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
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
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
