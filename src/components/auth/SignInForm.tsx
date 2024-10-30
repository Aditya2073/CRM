import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useCRMStore } from '../../store';

interface SignInFormProps {
  onToggleForm: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onToggleForm }) => {
  const { signIn, auth } = useCRMStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {auth.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {auth.error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={auth.isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {auth.isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Sign in'
          )}
        </button>
      </div>

      <div className="text-sm text-center">
        <button
          type="button"
          onClick={onToggleForm}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );
};