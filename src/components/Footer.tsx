import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary py-12">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl tracking-wider text-foreground">
            Hutke Studios
          </h3>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              hutkestudios@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              +91 8882776961
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Follow Us
          </h4>
        <div className="flex gap-4">
          {[
            { Icon: Instagram, url: "https://www.instagram.com/hutkestudios?igsh=MXF4MDUzbzFkOGc1dA==" },
            { Icon: Youtube, url: "https://youtube.com/@hutkestudios?si=JjLGkmoZesb-ChOp" }
          ].map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-muted p-2.5 text-muted-foreground transition-colors hover:bg-muted-foreground hover:text-background"
              aria-label="Social media link"
            >
            <social.Icon className="h-5 w-5" />
            </a>
          ))}
       </div>
      </div>
    </div>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hutke Studios. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
