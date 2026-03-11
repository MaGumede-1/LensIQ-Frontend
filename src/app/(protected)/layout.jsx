'use client';

import ProtectedRoute from '../../components/common/ProtectedRoute';
import Layout from '../../components/layout/Layout';

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}
