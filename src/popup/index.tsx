import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found in index.html');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
