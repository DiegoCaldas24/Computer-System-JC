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
      nextSlide();
    }, interval);

    return () => clearInterval(slider);
  }, [currentIndex, autoPlay, interval, nextSlide]);

  return (
    <div
      className="
        relative
        w-full
        h-62.5 sm:h-100
        overflow-hidden
        rounded-3xl
        mx-auto
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
              p-6
            "
          >
            <img
              src={image}
              alt={`slide-${index}`}
              className="
                max-w-full
                max-h-full
                object-contain
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
          left-4
          -translate-y-1/2
          bg-black/40
          hover:bg-black/60
          text-white
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          transition
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
          right-4
          -translate-y-1/2
          bg-black/40
          hover:bg-black/60
          text-white
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          transition
        "
      >
        ›
      </button>

      {/* Indicadores */}
      <div
        className="
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          flex
          gap-2
        "
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full transition
              ${currentIndex === index ? "bg-white" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
