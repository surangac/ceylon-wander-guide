import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, X, Mountain, Landmark, Train, Cat, Building2, Waves,
  Palmtree, Sun, Compass, Anchor, Ship, TreePine, Church
} from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  { id: "jaffna", name: "Jaffna", cx: 218, cy: 52, icon: Church, description: "Ancient Tamil heritage and vibrant culture", photo: "https://images.unsplash.com/photo-1590058638560-09e5c8dbea98?w=400&h=250&fit=crop" },
  { id: "anuradhapura", name: "Anuradhapura", cx: 190, cy: 145, icon: Landmark, description: "Sacred ruins of an ancient kingdom", photo: "https://images.unsplash.com/photo-1588428895668-2bd8a2f3e808?w=400&h=250&fit=crop" },
  { id: "wilpattu", name: "Wilpattu", cx: 145, cy: 160, icon: TreePine, description: "Untouched wilderness & leopard trails", photo: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=400&h=250&fit=crop" },
  { id: "trincomalee", name: "Trincomalee", cx: 310, cy: 170, icon: Anchor, description: "Pristine beaches and natural harbors", photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop" },
  { id: "sigiriya", name: "Sigiriya", cx: 235, cy: 205, icon: Mountain, description: "Ancient rock fortress with panoramic views", photo: "https://images.unsplash.com/photo-1586613835341-c2e0b2e29614?w=400&h=250&fit=crop" },
  { id: "kandy", name: "Kandy", cx: 215, cy: 265, icon: Landmark, description: "Cultural capital with sacred temples", photo: "https://images.unsplash.com/photo-1580810734915-2c0e56d9406c?w=400&h=250&fit=crop" },
  { id: "colombo", name: "Colombo", cx: 130, cy: 295, icon: Building2, description: "Vibrant capital city blending old & new", photo: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=400&h=250&fit=crop" },
  { id: "nuwara-eliya", name: "Nuwara Eliya", cx: 225, cy: 305, icon: Sun, description: "Misty hill country & tea plantations", photo: "https://images.unsplash.com/photo-1590058638560-09e5c8dbea98?w=400&h=250&fit=crop" },
  { id: "arugam-bay", name: "Arugam Bay", cx: 325, cy: 330, icon: Waves, description: "World-class surf & laid-back vibes", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop" },
  { id: "ella", name: "Ella", cx: 250, cy: 345, icon: Train, description: "Scenic hill country adventures", photo: "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=400&h=250&fit=crop" },
  { id: "bentota", name: "Bentota", cx: 135, cy: 365, icon: Ship, description: "Golden beaches & river safaris", photo: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400&h=250&fit=crop" },
  { id: "yala", name: "Yala", cx: 285, cy: 400, icon: Cat, description: "Premier wildlife safari destination", photo: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=250&fit=crop" },
  { id: "galle", name: "Galle Fort", cx: 170, cy: 430, icon: Building2, description: "Historic colonial fortress by the sea", photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop" },
  { id: "mirissa", name: "Mirissa", cx: 195, cy: 448, icon: Waves, description: "Beach paradise & whale watching", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop" },
];

// Accurate Sri Lanka SVG path
const SRI_LANKA_PATH = `
M 210 20
C 205 22, 195 28, 192 35
C 188 42, 185 48, 182 55
L 175 52
C 168 50, 160 52, 158 58
L 162 65
C 165 72, 170 75, 175 72
L 185 68
C 195 65, 205 58, 215 50
C 222 45, 228 42, 232 48
L 235 55
C 238 62, 235 68, 230 72
L 222 78
C 218 85, 215 92, 218 100
C 222 108, 228 112, 235 108
L 242 100
C 248 95, 255 92, 258 98
L 260 108
C 262 118, 268 128, 275 135
C 282 145, 298 155, 310 168
C 318 178, 322 188, 320 198
C 318 208, 312 218, 308 228
C 305 238, 308 248, 315 258
C 322 268, 328 278, 330 290
C 332 302, 330 312, 325 322
C 320 332, 318 342, 322 352
C 325 362, 322 372, 315 380
C 308 388, 298 395, 288 402
C 278 410, 268 418, 258 425
C 248 432, 235 438, 222 442
C 208 448, 195 452, 182 450
C 172 448, 165 442, 162 435
C 158 428, 155 418, 152 408
C 148 395, 142 382, 138 368
C 135 355, 132 342, 130 328
C 128 315, 125 302, 122 288
C 120 275, 118 262, 120 248
C 122 235, 125 222, 128 208
C 130 195, 132 182, 135 168
C 138 155, 142 142, 148 128
C 152 118, 158 108, 165 98
C 172 88, 178 78, 185 68
C 188 60, 195 48, 198 38
C 202 28, 208 22, 210 20
Z
`;

export const MapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const activeId = hoveredLocation || selectedLocation;
  const activeLocation = locations.find((l) => l.id === activeId);

  // Scroll tab into view when selected
  useEffect(() => {
    if (selectedLocation && tabBarRef.current) {
      const btn = tabBarRef.current.querySelector(`[data-id="${selectedLocation}"]`);
      btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selectedLocation]);

  const getTooltipPosition = (loc: typeof locations[0]) => {
    const x = loc.cx;
    const y = loc.cy;
    // Position tooltip to the right by default, left if pin is on the right side
    const tooltipX = x > 250 ? x - 220 : x + 25;
    const tooltipY = Math.max(10, Math.min(y - 60, 350));
    return { x: tooltipX, y: tooltipY };
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-ceylon-ocean/10 text-ceylon-ocean text-sm font-medium mb-4">
            Interactive Map
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore the
            <span className="text-gradient-gold block">Island</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Click on the map pins to discover key destinations across Sri Lanka.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-ceylon-ocean/5 to-ceylon-green/5 rounded-3xl overflow-hidden shadow-large border border-border p-4 md:p-8">
            {/* SVG Map */}
            <svg
              viewBox="80 0 300 480"
              className="w-full h-auto"
              style={{ maxHeight: "600px" }}
            >
              <defs>
                <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(170 40% 50%)" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="hsl(155 45% 60%)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="hsl(190 50% 45%)" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="shadowFilter">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
                </filter>
              </defs>

              {/* Ocean background */}
              <rect x="80" y="0" width="300" height="480" fill="hsl(200 60% 92%)" rx="16" />

              {/* Island shape with glow */}
              <path d={SRI_LANKA_PATH} fill="url(#mapFill)" stroke="hsl(170 45% 45%)" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#glow)" />

              {/* Location Pins */}
              {locations.map((location, i) => {
                const isActive = activeId === location.id;
                return (
                  <g
                    key={location.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredLocation(location.id)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
                  >
                    <motion.circle
                      cx={location.cx}
                      cy={location.cy}
                      r={isActive ? 10 : 7}
                      fill={isActive ? "hsl(36 87% 41%)" : "hsl(200 75% 40%)"}
                      stroke="hsl(0 0% 100%)"
                      strokeWidth="2.5"
                      filter="url(#shadowFilter)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.06, type: "spring", stiffness: 300 }}
                    />
                    {isActive && (
                      <motion.circle
                        cx={location.cx}
                        cy={location.cy}
                        r="16"
                        fill="none"
                        stroke="hsl(36 87% 41%)"
                        strokeWidth="2"
                        strokeOpacity="0.4"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip Card */}
            <AnimatePresence>
              {activeLocation && (
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, scale: 0.92, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute z-20 w-64 bg-card/95 backdrop-blur-md rounded-xl shadow-large border border-border overflow-hidden"
                  style={{
                    left: `${((getTooltipPosition(activeLocation).x - 80) / 300) * 100}%`,
                    top: `${(getTooltipPosition(activeLocation).y / 480) * 100}%`,
                  }}
                >
                  <div className="h-32 overflow-hidden">
                    <img
                      src={activeLocation.photo}
                      alt={activeLocation.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-ceylon-gold" />
                      <h3 className="font-display text-base font-semibold text-card-foreground">
                        {activeLocation.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{activeLocation.description}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLocation.name + " Sri Lanka")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ceylon-gold text-secondary-foreground text-xs font-semibold hover:bg-ceylon-gold/90 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      Learn More
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Tab Bar */}
          <div
            ref={tabBarRef}
            className="mt-6 flex overflow-x-auto gap-2 pb-2 scrollbar-none"
          >
            {locations.map((location) => (
              <button
                key={location.id}
                data-id={location.id}
                onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-200",
                  selectedLocation === location.id
                    ? "bg-ceylon-gold/20 text-ceylon-gold font-medium"
                    : "bg-muted text-muted-foreground hover:bg-ceylon-ocean/10 hover:text-ceylon-ocean"
                )}
              >
                <location.icon className="w-4 h-4" />
                {location.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
