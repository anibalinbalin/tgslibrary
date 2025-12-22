import clsx from "clsx";
import ArtCard, { ArtCardData } from "./ArtCard";

type ArtGalleryProps = {
  className?: string;
  /** Array of art pieces to display */
  items: ArtCardData[];
  /** Callback when an art card is clicked */
  onItemClick?: (item: ArtCardData) => void;
};

/**
 * Art Gallery component - displays a masonry layout of art cards
 * Each image preserves its natural aspect ratio
 * - Desktop (lg): 3 columns
 * - Medium (md): 2 columns
 * - Mobile: 1 column
 */
export default function ArtGallery({ 
  className, 
  items,
  onItemClick 
}: ArtGalleryProps) {
  return (
    <div 
      className={clsx(
        "w-full",
        className
      )}
    >
      {/* Masonry layout using CSS columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 w-full">
        {items.map((item) => (
          <ArtCard
            key={item.id}
            data={item}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    </div>
  );
}
