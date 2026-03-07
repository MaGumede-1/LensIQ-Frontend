import { Link } from 'react-router-dom';
import { Upload, Images } from 'lucide-react';
import { useBatches } from '../hooks/useBatches';
import BatchList from '../components/batch/BatchList';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

export default function Batches() {
  const { batches, loading } = useBatches();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">My Batches</h1>
          <p className="text-sm text-surface-500 mt-1">
            View all your uploaded photo batches and their processing status.
          </p>
        </div>
        <Link to="/upload">
          <Button>
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : batches.length === 0 ? (
        <EmptyState
          icon={Images}
          title="No batches yet"
          description="Upload your first batch of photos to see them listed here."
          action={
            <Link to="/upload">
              <Button>
                <Upload className="h-4 w-4" />
                Upload Photos
              </Button>
            </Link>
          }
        />
      ) : (
        <BatchList batches={batches} />
      )}
    </div>
  );
}
