'use client';

import Link from 'next/link';
import { Images, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/helpers';

const statusIcons = {
  PENDING: Clock,
  PROCESSING: Loader2,
  COMPLETED: CheckCircle2,
  FAILED: AlertCircle,
};

export default function BatchCard({ batch }) {
  const Icon = statusIcons[batch.status] || Clock;

  return (
    <Link
      href={`/batches/${batch.batch_id}`}
      className="group flex items-center gap-4 rounded-xl border border-surface-200 bg-white p-4 transition-all hover:shadow-md hover:border-brand-200"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
        {batch.status === 'PROCESSING' ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Images className="h-6 w-6" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-surface-900">
          Batch #{batch.batch_id}
        </p>
        <p className="text-xs text-surface-500 mt-0.5">
          Uploaded {formatDate(batch.uploaded_at)}
        </p>
      </div>
      <StatusBadge status={batch.status} />
    </Link>
  );
}
