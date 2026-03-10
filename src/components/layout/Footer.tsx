import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

const footerLinks = {
  destinations: [
    { label: "Sigiriya", href: "#destinations" },
    { label: "Kandy", href: "#destinations" },
    { label: "Ella", href: "#destinations" },
    { label: "Yala National Park", href: "#destinations" },
    { label: "Galle Fort", href: "#destinations" },
    { label: "Mirissa", href: "#destinations" },
  ],
  services: [
    { label: "Accommodation", href: "#accommodation" },
    { label: "Travel Planning", href: "#" },
    { label: "Safari Tours", href: "#" },
    { label: "Cultural Tours", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-ceylon-ocean flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-semibold text-foreground leading-tight">
                  Ceylon
                </span>
                <span className="text-xs font-medium tracking-wider text-ceylon-gold">
                  HERITAGE GUIDE
                </span>
              </div>
            </a>
            <p className="text-muted-foreground text-sm mb-6">
              Discover the Pearl of the Indian Ocean with expert guidance 
              and unforgettable experiences.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-ceylon-gold hover:text-secondary-foreground transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Destinations
            </h4>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-ceylon-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-ceylon-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-ceylon-gold" />
                hello@ceylonheritageguide.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-ceylon-gold" />
                +94 11 234 5678
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-ceylon-gold shrink-0 mt-0.5" />
                123 Galle Face Road, Colombo 03, Sri Lanka
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ceylon Serendipity. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.company.slice(2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-ceylon-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
