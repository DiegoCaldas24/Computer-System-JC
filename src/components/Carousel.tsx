import { useEffect, useState } from "react";

type CarouselProps = {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
};

export function Carousel({
  images,
  autoPlay = true,
  interval = 3000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoPlay) return;

    const slider = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(slider);
  }, [autoPlay, interval, images.length]);

  return (
    <div
      className="
        relative
        w-full
        h-44 sm:h-72 md:h-100
        overflow-hidden
        rounded-xl sm:rounded-3xl
        mx-auto
        pt-0 sm:pt-10
      "
    >
      {/* Imagen */}
      <div
        className="
          flex
          h-full
          transition-transform
          duration-500
          ease-in-out
        "
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="
              min-w-full
              h-full
              flex
              items-center
              justify-center
              p-0 sm:p-6
            "
          >
            <img
              src={image}
              alt={`slide-${index}`}
              className="
                w-full h-full
                object-cover sm:object-contain
              "
            />
          </div>
        ))}
      </div>

      {/* Botón izquierda */}
      <button
        onClick={prevSlide}
        className="
          absolute
          top-1/2
          left-1 sm:left-4
          -translate-y-1/2
          bg-black/40
          hover:bg-black/60
          text-white
          w-7 h-7 sm:w-10 sm:h-10
          rounded-full
          flex
          items-center
          justify-center
          transition
          text-sm sm:text-base
        "
      >
        ‹
      </button>

      {/* Botón derecha */}
      <button
        onClick={nextSlide}
        className="
          absolute
          top-1/2
          right-1 sm:right-4
          -translate-y-1/2
          bg-black/40
          hover:bg-black/60
          text-white
          w-7 h-7 sm:w-10 sm:h-10
          rounded-full
          flex
          items-center
          justify-center
          transition
          text-sm sm:text-base
        "
      >
        ›
      </button>

      {/* Indicadores */}
      <div
        className="
          absolute
          bottom-2 sm:bottom-4
          left-1/2
          -translate-x-1/2
          flex
          gap-1.5 sm:gap-2
        "
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              rounded-full transition
              w-2 h-2 sm:w-3 sm:h-3
              ${currentIndex === index ? "bg-white" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
