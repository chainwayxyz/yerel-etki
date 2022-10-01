import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaMaskProvider } from './hooks/metamask';

import { BrowserRouter, Route, Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { theme } from './components/Theme';

function getLibrary(provider, connector) {
  return new Web3(provider);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetaMaskProvider>
          <ThemeProvider theme={theme}>
          <App />
          </ThemeProvider>
        </MetaMaskProvider>
      </Web3ReactProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
