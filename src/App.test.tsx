import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';

test('renders sign up page link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const signUpElement = screen.getByText(/sign up/i); 
  expect(signUpElement).toBeInTheDocument();
});
