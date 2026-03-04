import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const images = [
  {
    src: "/images/pic1.webp",
    alt: "HDC Highlight 1",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/pic2.webp",
    alt: "HDC Highlight 2",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/images/pic3.webp",
    alt: "HDC Highlight 3",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/images/pic4.webp",
    alt: "HDC Highlight 4",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/images/pic5.webp",
    alt: "HDC Highlight 5",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "/images/pic6.webp",
    alt: "HDC Highlight 6",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    src: "/images/pic7.webp",
    alt: "HDC Highlight 7",
    className: "lg:col-span-2 lg:row-span-1",
  },
];

const Slideshow = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="slideshow" className="relative overflow-hidden bg-background py-20">
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl tracking-wider text-foreground text-glow sm:text-5xl">
            Gallery
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Moments of passion, rhythm, and glory.
          </p>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:h-[600px] lg:grid-cols-4 lg:grid-rows-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-xl bg-muted shadow-lg transition-all duration-700 ease-out",
                image.className,
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
