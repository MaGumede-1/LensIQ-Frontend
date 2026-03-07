import ImageCard from './ImageCard';

export default function ImageGrid({ images, bestShotCount = 3, onImageClick }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, idx) => (
        <ImageCard
          key={image.image_id}
          image={image}
          rank={idx + 1}
          isBestShot={idx < bestShotCount}
          onClick={onImageClick}
        />
      ))}
    </div>
  );
}
