import React from 'react';
import ReactDOM from 'react-dom/client';
import{ThemeProvider} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import './index.css';
import App from './App';
import {theme} from "./theme"
import {RecoilRoot} from "recoil";
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { GoogleOAuthProvider } from '@react-oauth/google';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RecoilRoot>
          <ThemeProvider theme={theme}>
              <CssBaseline/>
              <MsalProvider instance={msalInstance}>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <App/>
                </GoogleOAuthProvider>
              </MsalProvider>
          </ThemeProvider>
      </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
