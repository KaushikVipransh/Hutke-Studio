import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary py-12">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl tracking-wider text-foreground">
            Hutke Dance
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            India's most electrifying dance championship.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              info@hutkechampionship.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              +91 98765 43210
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Follow Us
          </h4>
          <div className="flex gap-4">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="rounded-full bg-muted p-2.5 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Social media link"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hutke Dance Championship. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
