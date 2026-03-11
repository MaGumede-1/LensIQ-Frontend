'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  SlidersHorizontal,
  Star,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useBatchImages } from '../../../../hooks/useBatches';
import { imageApi } from '../../../../api/imageApi';
import ImageGrid from '../../../../components/gallery/ImageGrid';
import ImageModal from '../../../../components/gallery/ImageModal';
import StatusBadge from '../../../../components/common/StatusBadge';
import Button from '../../../../components/common/Button';
import Spinner from '../../../../components/common/Spinner';
import { formatDate } from '../../../../utils/helpers';
import { SCORE_THRESHOLDS } from '../../../../utils/constants';

export default function BatchResultsPage() {
  const { batchId } = useParams();
  const { batch, images, loading, error, refetch } = useBatchImages(batchId);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bestShotCount, setBestShotCount] = useState(3);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await imageApi.exportBestShots(batchId, SCORE_THRESHOLDS.GOOD);
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `batch-${batchId}-best-shots.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Best shots exported!');
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button variant="secondary" onClick={refetch}>
          Try Again
        </Button>
      </div>
    );
  }

  const isProcessing = batch?.status === 'PROCESSING' || batch?.status === 'PENDING';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/batches"
            className="rounded-lg p-2 text-surface-500 hover:bg-surface-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-surface-900">
                Batch #{batchId}
              </h1>
              {batch && <StatusBadge status={batch.status} />}
            </div>
            {batch && (
              <p className="text-sm text-surface-500 mt-0.5">
                Uploaded {formatDate(batch.uploaded_at)} &middot; {images.length} photos
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isProcessing && (
            <Button variant="secondary" onClick={refetch}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          )}
          {!isProcessing && images.length > 0 && (
            <Button onClick={handleExport} loading={exporting}>
              <Download className="h-4 w-4" />
              Export Best Shots
            </Button>
          )}
        </div>
      </div>

      {/* Processing state */}
      {isProcessing && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-6">
            <div className="h-16 w-16 rounded-full border-4 border-brand-100" />
            <Loader2 className="absolute inset-0 m-auto h-10 w-10 text-brand-600 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-surface-800">
            Analyzing Your Photos
          </h2>
          <p className="mt-2 text-sm text-surface-500 max-w-md">
            Our AI is evaluating each photo for sharpness, exposure, contrast, and noise.
            This usually takes a few minutes.
          </p>
          <Button variant="secondary" className="mt-6" onClick={refetch}>
            <RefreshCw className="h-4 w-4" />
            Check Status
          </Button>
        </div>
      )}

      {/* Results */}
      {!isProcessing && images.length > 0 && (
        <>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-surface-200 bg-white p-4">
            <div className="flex items-center gap-2 text-sm text-surface-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>
                Top <strong>{bestShotCount}</strong> photos highlighted as best shots
              </span>
            </div>
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-4 w-4 text-surface-400" />
              <label className="text-sm text-surface-600">Best shots:</label>
              <select
                value={bestShotCount}
                onChange={(e) => setBestShotCount(Number(e.target.value))}
                className="rounded-lg border border-surface-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {[1, 3, 5, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image grid */}
          <ImageGrid
            images={images}
            bestShotCount={bestShotCount}
            onImageClick={setSelectedImage}
          />

          {/* Image detail modal */}
          <ImageModal
            image={selectedImage}
            images={images}
            onClose={() => setSelectedImage(null)}
            onNavigate={setSelectedImage}
          />
        </>
      )}

      {!isProcessing && images.length === 0 && (
        <div className="text-center py-20 text-surface-500">
          No images found in this batch.
        </div>
      )}
    </div>
  );
}
