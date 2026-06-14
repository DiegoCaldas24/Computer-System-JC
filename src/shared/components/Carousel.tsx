import { useEffect, useState, type ReactNode } from "react";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  autoPlay?: boolean;
  interval?: number;
  heightClass?: string;
  roundedClass?: string;
  containerClass?: string;
};

export function Carousel<T>({
  items,
  renderItem,
  autoPlay = true,
  interval = 3000,
  heightClass = "h-44 sm:h-72 md:h-100",
  roundedClass = "rounded-xl sm:rounded-3xl",
  containerClass = "",
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoPlay) return;

    const slider = setInterval(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(slider);
  }, [autoPlay, interval, items.length]);

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden ${roundedClass} mx-auto ${containerClass}`}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="min-w-full h-full">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-1 sm:left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition text-sm sm:text-base"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-1 sm:right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition text-sm sm:text-base"
      >
        ›
      </button>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition w-2 h-2 sm:w-3 sm:h-3 ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}