import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../feature/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });
      dispatch(login({ email, token: response.data.token }));
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid login credentials. Please try again.'); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Sign In
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
