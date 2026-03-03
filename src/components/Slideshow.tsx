import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { url: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=600&fit=crop", alt: "Dance performance 1" },
  { url: "https://images.unsplash.com/photo-1547153760-18fc86c1b3e4?w=1200&h=600&fit=crop", alt: "Dance performance 2" },
  { url: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&h=600&fit=crop", alt: "Dance performance 3" },
  { url: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&h=600&fit=crop", alt: "Dance performance 4" },
  { url: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop", alt: "Dance performance 5" },
];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="slideshow" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-12 text-center font-display text-4xl tracking-wider text-foreground sm:text-5xl">
          Previous Editions
        </h2>

        <div className="relative overflow-hidden rounded-lg">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.url}
                alt={slide.alt}
                className="aspect-video w-full flex-shrink-0 object-cover"
                loading="lazy"
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === current
                    ? "scale-125 bg-primary box-glow"
                    : "bg-foreground/40 hover:bg-foreground/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
