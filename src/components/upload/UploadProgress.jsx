import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function UploadProgress({ progress, status, fileCount }) {
  const isComplete = status === 'complete';
  const isError = status === 'error';
  const isUploading = status === 'uploading';

  return (
    <div className="rounded-xl border border-surface-200 bg-white p-6">
      <div className="flex items-center gap-3 mb-4">
        {isUploading && <Loader2 className="h-5 w-5 text-brand-600 animate-spin" />}
        {isComplete && <CheckCircle2 className="h-5 w-5 text-green-500" />}
        {isError && <AlertCircle className="h-5 w-5 text-red-500" />}
        <div>
          <p className="text-sm font-medium text-surface-800">
            {isUploading && `Uploading ${fileCount} photo${fileCount !== 1 ? 's' : ''}…`}
            {isComplete && 'Upload complete! Processing your photos…'}
            {isError && 'Upload failed. Please try again.'}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-surface-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isError ? 'bg-red-500' : isComplete ? 'bg-green-500' : 'bg-brand-600'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-surface-500 text-right">{progress}%</p>
    </div>
  );
}
