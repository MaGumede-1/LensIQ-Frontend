'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { imageApi } from '../../../api/imageApi';
import DropZone from '../../../components/upload/DropZone';
import FilePreviewGrid from '../../../components/upload/FilePreviewGrid';
import UploadProgress from '../../../components/upload/UploadProgress';
import Button from '../../../components/common/Button';

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | complete | error

  const handleFilesSelected = useCallback((newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleRemove = useCallback((idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one photo');
      return;
    }

    setStatus('uploading');
    setProgress(0);

    try {
      const res = await imageApi.uploadBatch(files, (pct) => setProgress(pct));
      setStatus('complete');
      toast.success('Photos uploaded successfully!');
      setTimeout(() => {
        router.push(`/batches/${res.data.batch_id}`);
      }, 1500);
    } catch {
      setStatus('error');
      toast.error('Upload failed. Please try again.');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setProgress(0);
    setStatus('idle');
  };

  const isUploading = status === 'uploading';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Upload Photos</h1>
        <p className="text-sm text-surface-500 mt-1">
          Drop your photos below and we&apos;ll analyze them for quality.
        </p>
      </div>

      {status === 'idle' || status === 'error' ? (
        <>
          <DropZone onFilesSelected={handleFilesSelected} disabled={isUploading} />
          <FilePreviewGrid files={files} onRemove={handleRemove} />

          {files.length > 0 && (
            <div className="flex items-center justify-between rounded-xl border border-surface-200 bg-white p-4">
              <p className="text-sm text-surface-600">
                <span className="font-semibold text-surface-900">{files.length}</span>{' '}
                photo{files.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={handleReset}>
                  Clear All
                </Button>
                <Button onClick={handleUpload}>
                  Upload &amp; Analyze
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <UploadProgress
          progress={progress}
          status={status}
          fileCount={files.length}
        />
      )}
    </div>
  );
}
