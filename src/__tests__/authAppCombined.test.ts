import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout } from '../feature/authSlice';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import App from '../App';
import axios from 'axios';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

jest.mock('axios');

// Mock store configuration
const mockStore = configureStore({ reducer: { auth: authReducer } });

// Helper function to set up SignIn component
const setupSignIn = () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </Provider>
  );
  return {
    emailInput: screen.getByPlaceholderText(/email/i) as HTMLInputElement,
    passwordInput: screen.getByPlaceholderText(/password/i) as HTMLInputElement,
    signInButton: screen.getByRole('button', { name: /sign in/i }),
  };
};

// Helper function to set up SignUp component
const setupSignUp = () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </Provider>
  );
  return {
    emailInput: screen.getByPlaceholderText(/email/i) as HTMLInputElement,
    passwordInput: screen.getByPlaceholderText(/password/i) as HTMLInputElement,
    signUpButton: screen.getByRole('button', { name: /sign up/i }),
  };
};

// Helper function to set up Dashboard component
const setupDashboard = (store: ReturnType<typeof configureStore>) => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>
  );
};

describe('Authentication Suite', () => {
  
  // Tests for authSlice actions and reducers
  describe('authSlice', () => {
    it('should handle login', () => {
      const initialState = { user: null, token: null };

      const newState = authReducer(initialState, login({ email: 'eve.holt@reqres.in', token: 'token123' }));

      expect(newState).toEqual({
        user: { email: 'eve.holt@reqres.in' },
        token: 'token123',
      });
    });

    it('should handle logout', () => {
      const initialState = { user: { email: 'eve.holt@reqres.in' }, token: 'token123' };

      const newState = authReducer(initialState, logout());

      expect(newState).toEqual({
        user: null,
        token: null,
      });
    });
  });

  // Tests for SignIn component
  describe('SignIn Component', () => {
    it('should submit form and login', async () => {
      const mockToken = 'testToken';
      axios.post.mockResolvedValueOnce({ data: { token: mockToken } });

      const { emailInput, passwordInput, signInButton } = setupSignIn();

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(signInButton);

      await waitFor(() => 
        expect(axios.post).toHaveBeenCalledWith('https://reqres.in/api/login', {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        })
      );
      const state = mockStore.getState().auth;
      expect(state.token).toBe(mockToken); 
    });

    it('should display error message if login fails', async () => {
      axios.post.mockRejectedValueOnce({ response: { data: { error: 'user not found' } } });

      const { emailInput, passwordInput, signInButton } = setupSignIn();

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(signInButton);

      await waitFor(() => expect(axios.post).toHaveBeenCalled());

      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });

  // Tests for Dashboard component
  describe('Dashboard Component', () => {
    it('should display user email and log out', () => {
      const preloadedState = {
        auth: {
          user: { email: 'eve.holt@reqres.in' },
          token: 'testToken',
        },
      };

      const store = configureStore({
        reducer: { auth: authReducer },
        preloadedState,
      });

      setupDashboard(store);

      expect(screen.getByText(/welcome, test@example.com/i)).toBeInTheDocument();

      const logoutButton = screen.getByText(/log out/i);
      fireEvent.click(logoutButton);

      expect(store.getState().auth.user).toBe(null);
    });
  });

  // Test for App Component
  test('renders sign up page link', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const signUpElement = screen.getByText(/sign up/i); 
    expect(signUpElement).toBeInTheDocument();
  });
});
