import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { HMSRoomProvider } from "@100mslive/react-sdk";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
  </React.StrictMode>
);