import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, X, Mountain, Landmark, Train, Cat, Building2, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  { id: "sigiriya", name: "Sigiriya", x: 58, y: 32, icon: Mountain, description: "Ancient rock fortress with panoramic views" },
  { id: "kandy", name: "Kandy", x: 52, y: 42, icon: Landmark, description: "Cultural capital with sacred temples" },
  { id: "ella", name: "Ella", x: 55, y: 55, icon: Train, description: "Scenic hill country adventures" },
  { id: "yala", name: "Yala", x: 68, y: 72, icon: Cat, description: "Premier wildlife safari destination" },
  { id: "galle", name: "Galle Fort", x: 40, y: 82, icon: Building2, description: "Historic colonial fortress" },
  { id: "mirissa", name: "Mirissa", x: 45, y: 85, icon: Waves, description: "Beach paradise & whale watching" },
];

export const MapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const selected = locations.find((l) => l.id === selectedLocation);

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
          className="relative max-w-4xl mx-auto"
        >
          {/* Map Background */}
          <div className="relative aspect-[3/4] md:aspect-[4/3] bg-gradient-to-br from-ceylon-ocean/5 to-ceylon-green/5 rounded-3xl overflow-hidden shadow-large border border-border">
            {/* Stylized Island Shape */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(145 45% 35%)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(145 40% 75%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(200 75% 45%)" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(200 75% 45%)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="hsl(215 80% 25%)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {/* Ocean */}
              <rect width="100" height="100" fill="url(#oceanGradient)" />
              
              {/* Sri Lanka Island Shape (simplified) */}
              <path
                d="M55 15 
                   C60 18, 68 22, 70 30
                   C72 40, 75 50, 73 60
                   C71 70, 68 80, 60 88
                   C55 92, 45 92, 40 88
                   C35 84, 32 78, 32 70
                   C32 60, 35 50, 38 40
                   C40 30, 45 20, 55 15
                   Z"
                fill="url(#islandGradient)"
                stroke="hsl(145 45% 35%)"
                strokeWidth="0.5"
                strokeOpacity="0.5"
              />
            </svg>

            {/* Location Pins */}
            {locations.map((location) => (
              <motion.button
                key={location.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ delay: 0.5 + locations.indexOf(location) * 0.1 }}
                onClick={() => setSelectedLocation(location.id)}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 z-10",
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "transition-all duration-300 cursor-pointer",
                  selectedLocation === location.id
                    ? "bg-ceylon-gold shadow-glow-gold scale-110"
                    : "bg-ceylon-ocean hover:bg-ceylon-gold shadow-medium"
                )}
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
              >
                <location.icon className="w-5 h-5 text-primary-foreground" />
              </motion.button>
            ))}

            {/* Location Info Card */}
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-card/95 backdrop-blur-sm rounded-xl shadow-large p-4"
              >
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-ceylon-gold/10 flex items-center justify-center">
                    <selected.icon className="w-5 h-5 text-ceylon-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">
                    {selected.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{selected.description}</p>
                <a
                  href="#destinations"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-ceylon-ocean hover:text-ceylon-gold transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Learn more
                </a>
              </motion.div>
            )}
          </div>

          {/* Location Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-200",
                  selectedLocation === location.id
                    ? "bg-ceylon-gold/20 text-ceylon-gold"
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
