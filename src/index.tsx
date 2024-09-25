import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import your CSS here
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';  // Ensure your store file path is correct

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
