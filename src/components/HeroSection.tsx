import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToSlideshow = () => {
    document.getElementById("slideshow")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="font-display text-6xl tracking-wider text-foreground text-glow sm:text-7xl md:text-8xl lg:text-9xl">
          Hutke Dance
          <br />
          Championship
        </h1>
        <p className="max-w-xl text-lg font-light text-muted-foreground sm:text-xl">
          The Soul of Dance, The Heart of Hustle
        </p>
        <Button variant="hero" size="lg" className="mt-4 px-10 py-6 text-lg">
          Register Here
        </Button>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToSlideshow}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default HeroSection;
