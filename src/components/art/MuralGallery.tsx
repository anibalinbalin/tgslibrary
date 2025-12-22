import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "./ChevronIcons";

export type MuralImage = {
  id: string;
  imageSrc: string;
};

export type MuralData = {
  id: string;
  title: string;
  location: string;
  date: string;
  description?: string;
  images: MuralImage[];
};

type MuralGalleryProps = {
  className?: string;
  data: MuralData;
  /** Callback when an image is clicked */
  onImageClick?: (image: MuralImage) => void;
};

/**
 * Mural Gallery component - horizontal scrolling carousel
 * with title, location, date, description and navigation arrows
 * 
 * Responsive behavior:
 * - Desktop: Location/Date and Description side by side
 * - Mobile: Location/Date and Description stacked vertically
 */
export default function MuralGallery({ 
  className, 
  data,
  onImageClick 
}: MuralGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Responsive scroll distance based on current card size
    const cardWidth = Math.min(container.clientWidth * 0.82, 320);
    const scrollAmount = cardWidth + 16;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className={clsx("flex flex-col gap-8 pb-12 w-full", className)}>
      {/* Header section */}
      <div className="flex flex-col gap-4 items-start w-full">
        {/* Title */}
        <p className="font-medium leading-normal text-gray-900 text-base">
          {data.title}
        </p>
        
        {/* Metadata row - responsive layout */}
        <div className="flex flex-col md:flex-row font-medium gap-5 items-start text-base w-full">
          {/* Location and Date */}
          <div className="flex flex-col items-start leading-[1.4] w-[202px] flex-shrink-0">
            <p className="text-gray-600">
              {data.location}
            </p>
            <p className="text-gray-400">
              {data.date}
            </p>
          </div>
          
          {/* Description */}
          {data.description && (
            <p className="leading-normal text-gray-400 max-w-[366px] whitespace-pre-wrap">
              {data.description}
            </p>
          )}
        </div>
      </div>

      {/* Scrollable gallery container */}
      <div className="relative w-full">
        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 items-center justify-start overflow-x-auto w-full scrollbar-hide pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.images.map((image) => (
            <button
              key={image.id}
              onClick={() => onImageClick?.(image)}
              className="flex-shrink-0 w-[82vw] max-w-[20rem] min-w-[14rem] md:w-[225px] rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[0.98]"
            >
              <div className="relative w-full aspect-[3/4]">
                <img
                  src={image.imageSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover rounded-xl bg-[#e3dff4]"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Left navigation button */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-0 pr-12"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.35) 70%, rgba(255,255,255,0.1) 88%, rgba(255,255,255,0) 100%)",
          }}
        >
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={clsx(
              "pointer-events-auto size-6 flex items-center justify-center transition-colors",
              canScrollLeft ? "text-gray-900 hover:text-gray-600" : "text-gray-300 cursor-default"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
        </div>

        {/* Right navigation button */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-12 pr-0"
          style={{
            backgroundImage: "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.35) 70%, rgba(255,255,255,0.1) 88%, rgba(255,255,255,0) 100%)",
          }}
        >
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={clsx(
              "pointer-events-auto size-6 flex items-center justify-center transition-colors",
              canScrollRight ? "text-gray-900 hover:text-gray-600" : "text-gray-300 cursor-default"
            )}
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
