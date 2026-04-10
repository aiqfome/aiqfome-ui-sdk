import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@aiqfome-sdk/themes/tokens.css';
import { setupAiqfomeUI } from '@aiqfome-sdk/ui-react';
import { App } from './App';
import './styles.css';

setupAiqfomeUI();

const root = document.getElementById('app');
if (!root) {
  throw new Error('Missing #app root element');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
