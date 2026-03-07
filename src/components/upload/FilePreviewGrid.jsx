import { X } from 'lucide-react';

export default function FilePreviewGrid({ files, onRemove }) {
  if (!files.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-surface-700 mb-3">
        Selected Photos ({files.length})
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {files.map((file, idx) => (
          <div key={`${file.name}-${idx}`} className="group relative aspect-square rounded-lg overflow-hidden bg-surface-100">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-full w-full object-cover"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
            <button
              onClick={() => onRemove(idx)}
              className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-1">
              <p className="text-[10px] text-white truncate">{file.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
