import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ImagePlus } from 'lucide-react';

const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/tiff': ['.tiff', '.tif'],
};

export default function DropZone({ onFilesSelected, disabled = false }) {
  const onDrop = useCallback(
    (accepted) => {
      if (accepted.length > 0) {
        onFilesSelected(accepted);
      }
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    disabled,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed
        px-6 py-16 text-center transition-all duration-200 cursor-pointer
        ${isDragActive ? 'dropzone-active border-brand-400' : 'border-surface-300 hover:border-brand-300 hover:bg-surface-50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <div className="mb-4 rounded-full bg-brand-50 p-4">
        {isDragActive ? (
          <ImagePlus className="h-8 w-8 text-brand-600" />
        ) : (
          <Upload className="h-8 w-8 text-brand-500" />
        )}
      </div>
      {isDragActive ? (
        <p className="text-lg font-semibold text-brand-700">Drop your photos here</p>
      ) : (
        <>
          <p className="text-lg font-semibold text-surface-800">
            Drag & drop your photos here
          </p>
          <p className="mt-1 text-sm text-surface-500">
            or <span className="text-brand-600 font-medium">browse files</span>
          </p>
          <p className="mt-3 text-xs text-surface-400">
            Supports JPG, PNG, WebP, TIFF
          </p>
        </>
      )}
    </div>
  );
}
