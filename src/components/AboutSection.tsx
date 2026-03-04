
import { Target, Sparkles, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about-hdc" className="bg-background py-20 relative overflow-hidden">
      {/* Subtle background texture/glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="mb-16 text-center font-display text-4xl tracking-wider text-foreground sm:text-5xl text-glow">
          About HDC 2026
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Column 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary border border-border transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/50 shadow-lg">
              <Target className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-4 font-display text-xl tracking-wide text-foreground">
              Our Purpose
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Hutke Dance Championship is a prestigious cultural event that elevates diverse dance forms and provides a stage for artists to perform with pride and professionalism.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary border border-border transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/50 shadow-lg">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-4 font-display text-xl tracking-wide text-foreground">
              What We Support
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We foster creativity, encourage artistic excellence, and nurture local talent — strengthening cultural values and inspiring the next generation of performers.
            </p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary border border-border transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/50 shadow-lg">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-4 font-display text-xl tracking-wide text-foreground">
              Community Impact
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              HDC builds community connections across colleges, dance collectives, and cultural organizations while creating visibility for sponsors eager to reach engaged youth audiences.
            </p>
          </div>
        </div>
     </div>
    </section>
 );
};

export default AboutSection;
