'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </AuthProvider>
  );
}
