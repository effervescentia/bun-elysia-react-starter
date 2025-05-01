import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app.component';
import { RouteProvider } from './app/app.router';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </React.StrictMode>,
);
