import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTripPlanner } from "@/components/trip-planner/TripPlannerContext";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "About", href: "#about" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: openTripPlanner } = useTripPlanner();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleNavClick = (href: string) => {
    if (isHome) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + href);
    }
  };

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-medium py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleLogoClick(); }} className="flex items-center gap-2 group cursor-pointer">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
              isScrolled ? "bg-ceylon-ocean" : "bg-primary-foreground/20 backdrop-blur-sm"
            )}>
              <MapPin className={cn(
                "w-5 h-5 transition-colors",
                isScrolled ? "text-primary-foreground" : "text-primary-foreground"
              )} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-display text-lg font-semibold leading-tight transition-colors",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}>
                Ceylon
              </span>
              <span className={cn(
                "text-xs font-medium tracking-wider transition-colors",
                isScrolled ? "text-ceylon-gold" : "text-ceylon-gold-light"
              )}>
                HERITAGE GUIDE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={cn(
                  "relative font-medium transition-colors hover:text-ceylon-gold cursor-pointer",
                  isScrolled ? "text-foreground" : "text-primary-foreground",
                  "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-ceylon-gold after:transition-all after:duration-300 hover:after:w-full"
                )}
              >
                {item.label}
              </a>
            ))}
            <Button variant={isScrolled ? "gold" : "hero"} size="default" onClick={openTripPlanner}>
              Plan Your Trip
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-foreground hover:bg-muted" : "text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleNavClick(item.href); }}
                    className={cn(
                      "block py-2 font-medium transition-colors cursor-pointer",
                      isScrolled ? "text-foreground hover:text-ceylon-gold" : "text-primary-foreground hover:text-ceylon-gold"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
                <Button variant="gold" size="lg" className="w-full" onClick={() => { setIsMobileMenuOpen(false); openTripPlanner(); }}>
                  Plan Your Trip
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
