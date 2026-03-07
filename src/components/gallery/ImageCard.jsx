import { Star, Eye } from 'lucide-react';
import ScoreBadge from './ScoreBadge';

export default function ImageCard({ image, rank, isBestShot, onClick }) {
  return (
    <div
      onClick={() => onClick?.(image)}
      className={`
        image-card group relative cursor-pointer rounded-xl overflow-hidden bg-white
        border-2 transition-all duration-200 hover:shadow-lg
        ${isBestShot ? 'border-yellow-400 shadow-yellow-100' : 'border-transparent shadow-sm'}
      `}
    >
      {/* Rank badge */}
      {rank != null && (
        <div className="absolute top-2 left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-xs font-bold text-white">
          {rank}
        </div>
      )}

      {/* Best shot star */}
      {isBestShot && (
        <div className="absolute top-2 right-2 z-10">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow" />
        </div>
      )}

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-surface-100">
        <img
          src={image.url}
          alt={`Photo ${image.image_id}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Hover overlay */}
      <div className="image-overlay absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200">
        <div className="rounded-full bg-white/90 p-2">
          <Eye className="h-5 w-5 text-surface-700" />
        </div>
      </div>

      {/* Score footer */}
      <div className="flex items-center justify-between p-3">
        <ScoreBadge score={image.score} size="sm" />
        <span className="text-xs text-surface-400">#{image.image_id}</span>
      </div>
    </div>
  );
}
