'use client';

import Link from 'next/link';
import { Upload, Images, Camera, Star, Clock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useBatches } from '../../../hooks/useBatches';
import BatchList from '../../../components/batch/BatchList';
import Button from '../../../components/common/Button';
import Spinner from '../../../components/common/Spinner';
import EmptyState from '../../../components/common/EmptyState';

export default function DashboardPage() {
  const { user } = useAuth();
  const { batches, loading } = useBatches();

  const recentBatches = batches.slice(0, 5);
  const completedCount = batches.filter((b) => b.status === 'COMPLETED').length;
  const processingCount = batches.filter(
    (b) => b.status === 'PROCESSING' || b.status === 'PENDING'
  ).length;

  const stats = [
    {
      icon: Images,
      label: 'Total Batches',
      value: batches.length,
      color: 'bg-brand-50 text-brand-600',
    },
    {
      icon: Star,
      label: 'Completed',
      value: completedCount,
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Clock,
      label: 'Processing',
      value: processingCount,
      color: 'bg-yellow-50 text-yellow-600',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">
            Welcome back, {user?.name || 'Photographer'}
          </h1>
          <p className="text-sm text-surface-500 mt-1">
            Here&apos;s an overview of your photo processing.
          </p>
        </div>
        <Link href="/upload">
          <Button>
            <Upload className="h-4 w-4" />
            Upload Photos
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-surface-200 bg-white p-5"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{value}</p>
              <p className="text-xs text-surface-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Batches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">Recent Batches</h2>
          {batches.length > 5 && (
            <Link
              href="/batches"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View all
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : recentBatches.length === 0 ? (
          <EmptyState
            icon={Camera}
            title="No batches yet"
            description="Upload your first batch of photos to get started with AI-powered culling."
            action={
              <Link href="/upload">
                <Button>
                  <Upload className="h-4 w-4" />
                  Upload Photos
                </Button>
              </Link>
            }
          />
        ) : (
          <BatchList batches={recentBatches} />
        )}
      </div>
    </div>
  );
}
