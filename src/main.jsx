import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';

import App from './App';

import './style.scss';
import { ClerkProvider } from '@clerk/clerk-react';
import { shadesOfPurple } from '@clerk/themes';
import { MantineProvider } from '@mantine/core';
// Mantine CSS'ini import et
import '@mantine/core/styles.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: shadesOfPurple
      }}
    >
      <MantineProvider>
        <App />
      </MantineProvider>
      <Analytics />
    </ClerkProvider>
  </React.StrictMode>
);
