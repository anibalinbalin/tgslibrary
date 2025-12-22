import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "./ChevronIcons";

export type SketchbookItem = {
  id: string;
  imageSrc: string;
};

export type SketchbookData = {
  id: string;
  title: string;
  date: string;
  images: SketchbookItem[];
};

type SketchbookGalleryProps = {
  className?: string;
  data: SketchbookData;
  /** Callback when an image is clicked */
  onImageClick?: (image: SketchbookItem) => void;
};

/**
 * Sketchbook Gallery component - horizontal scrolling carousel
 * with title/date caption and navigation arrows
 */
export default function SketchbookGallery({ 
  className, 
  data,
  onImageClick 
}: SketchbookGalleryProps) {
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

    // Use the current card width for smoother responsive scrolling
    const cardWidth = Math.min(container.clientWidth * 0.82, 320);
    const scrollAmount = cardWidth + 16; // add the gap
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
    <div className={clsx("flex flex-col gap-6 pb-6 w-full", className)}>
      {/* Caption: Title and Date */}
      <div className="flex flex-col font-medium items-start leading-[1.4] text-base">
        <p className="text-gray-900">
          {data.title}
        </p>
        <p className="text-gray-400">
          {data.date}
        </p>
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
              className="flex-shrink-0 w-[82vw] max-w-[20rem] min-w-[14rem] md:w-72 rounded-xl overflow-hidden cursor-pointer"
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
              canScrollLeft ? "text-gray-500 hover:text-gray-600" : "text-gray-300 cursor-default"
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
              "pointer-events-auto size-6 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-600 cursor-default"
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
