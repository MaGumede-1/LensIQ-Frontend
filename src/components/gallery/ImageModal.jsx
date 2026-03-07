import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import ScoreBadge from './ScoreBadge';
import { getScoreLabel } from '../../utils/helpers';

export default function ImageModal({ image, images, onClose, onNavigate }) {
  if (!image) return null;

  const currentIdx = images.findIndex((img) => img.image_id === image.image_id);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < images.length - 1;

  const scoreDetails = [
    { label: 'Sharpness', key: 'sharpness_score' },
    { label: 'Brightness', key: 'brightness_score' },
    { label: 'Contrast', key: 'contrast_score' },
    { label: 'Noise', key: 'noise_score' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation */}
      {hasPrev && (
        <button
          onClick={() => onNavigate(images[currentIdx - 1])}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={() => onNavigate(images[currentIdx + 1])}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Content */}
      <div className="flex h-full w-full max-w-7xl flex-col lg:flex-row items-center gap-6 p-4 lg:p-8">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <img
            src={image.url}
            alt={`Photo ${image.image_id}`}
            className="max-h-[70vh] lg:max-h-[85vh] w-auto rounded-lg object-contain"
          />
        </div>

        {/* Details panel */}
        <div className="w-full lg:w-80 shrink-0 rounded-2xl bg-white p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-surface-900">
              Photo #{image.image_id}
            </h3>
            <a
              href={image.url}
              download
              className="rounded-lg p-2 text-surface-500 hover:bg-surface-100"
            >
              <Download className="h-5 w-5" />
            </a>
          </div>

          {/* Overall score */}
          <div className="flex justify-center mb-6">
            <ScoreBadge score={image.score} size="md" />
          </div>

          {/* Score breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
              Score Breakdown
            </h4>
            {scoreDetails.map(({ label, key }) => {
              const val = image[key];
              if (val == null) return null;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-surface-600">{label}</span>
                    <span className="font-medium text-surface-800">
                      {Math.round(val * 100)}% — {getScoreLabel(val)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-100">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{ width: `${val * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Position */}
          <div className="mt-6 text-center text-xs text-surface-400">
            {currentIdx + 1} of {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}
