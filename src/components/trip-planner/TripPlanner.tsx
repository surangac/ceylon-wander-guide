import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Flag, Calendar, Gauge, Compass, X, Loader2, Route, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTripPlanner } from "./TripPlannerContext";

const DESTINATIONS = [
  "Sigiriya", "Kandy", "Ella", "Galle", "Yala",
  "Trincomalee", "Anuradhapura", "Nuwara Eliya", "Wilpattu", "Mirissa",
];

const TRAVEL_STYLES = [
  { label: "Culture", icon: "🏛️" },
  { label: "Nature", icon: "🌿" },
  { label: "Adventure", icon: "🧗" },
  { label: "Relaxation", icon: "🏖️" },
  { label: "Mixed", icon: "✨" },
];

interface ItineraryDay {
  day: number;
  title: string;
  locations: string[];
  description: string;
  distance_km: number;
  highlights: string[];
}

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-itinerary`;

export const TripPlanner = () => {
  const { isOpen, setIsOpen } = useTripPlanner();
  const [startLocation, setStartLocation] = useState("Colombo");
  const [endLocation, setEndLocation] = useState("");
  const [numDays, setNumDays] = useState(7);
  const [dailyDistance, setDailyDistance] = useState([150]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [travelStyle, setTravelStyle] = useState("Mixed");
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [error, setError] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itinerary.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [itinerary]);

  const toggleDestination = (dest: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const handleGenerate = async () => {
    setError("");
    setItinerary([]);
    setIsLoading(true);

    try {
      const resp = await fetch(GENERATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          startLocation,
          endLocation: endLocation || startLocation,
          numDays,
          dailyDistanceKm: dailyDistance[0],
          destinations: selectedDestinations,
          travelStyle,
        }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed (${resp.status})`);
      }

      const data = await resp.json();
      setItinerary(data.itinerary || []);
    } catch (e: any) {
      setError(e.message || "Failed to generate itinerary");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="container mx-auto px-4 py-8 max-w-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Plan Your <span className="text-ceylon-gold">Journey</span>
                </h2>
                <p className="text-muted-foreground mt-1">AI-powered itinerary for your Sri Lankan adventure</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-medium space-y-6">
              {/* Locations Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-ceylon-gold" /> Starting Location
                  </Label>
                  <Input
                    placeholder="e.g. Colombo"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-foreground">
                    <Flag className="w-4 h-4 text-ceylon-ocean" /> End Location
                  </Label>
                  <Input
                    placeholder="e.g. Jaffna (or same as start)"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    className="bg-muted/50 border-border"
                  />
                </div>
              </div>

              {/* Days + Distance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-foreground">
                    <Calendar className="w-4 h-4 text-ceylon-green" /> Number of Days
                  </Label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNumDays(Math.max(1, numDays - 1))}
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground font-bold transition-colors"
                    >
                      −
                    </button>
                    <span className="text-2xl font-display font-bold text-ceylon-gold w-12 text-center">
                      {numDays}
                    </span>
                    <button
                      onClick={() => setNumDays(Math.min(21, numDays + 1))}
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-foreground">
                    <Gauge className="w-4 h-4 text-ceylon-temple" /> Daily Travel Distance
                  </Label>
                  <Slider
                    value={dailyDistance}
                    onValueChange={setDailyDistance}
                    min={50}
                    max={400}
                    step={10}
                    className="mt-3"
                  />
                  <p className="text-sm text-muted-foreground text-right">{dailyDistance[0]} km/day max</p>
                </div>
              </div>

              {/* Preferred Destinations */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-foreground">
                  <Compass className="w-4 h-4 text-ceylon-gold" /> Preferred Destinations
                </Label>
                <div className="flex flex-wrap gap-2">
                  {DESTINATIONS.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => toggleDestination(dest)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                        selectedDestinations.includes(dest)
                          ? "bg-ceylon-gold/20 border-ceylon-gold text-ceylon-gold"
                          : "bg-muted/50 border-border text-muted-foreground hover:border-ceylon-gold/50 hover:text-foreground"
                      )}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-foreground">
                  🎯 Travel Style
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TRAVEL_STYLES.map((style) => (
                    <button
                      key={style.label}
                      onClick={() => setTravelStyle(style.label)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                        travelStyle === style.label
                          ? "bg-ceylon-ocean/15 border-ceylon-ocean text-ceylon-ocean"
                          : "bg-muted/50 border-border text-muted-foreground hover:border-ceylon-ocean/50"
                      )}
                    >
                      <span className="text-lg">{style.icon}</span>
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                variant="gold"
                size="xl"
                className="w-full"
                onClick={handleGenerate}
                disabled={isLoading || !startLocation}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI is planning your perfect route…
                  </>
                ) : (
                  <>
                    <Route className="w-5 h-5" />
                    Generate My Itinerary
                  </>
                )}
              </Button>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </div>

            {/* Loading Animation */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 flex flex-col items-center gap-4"
                >
                  <div className="relative w-24 h-24">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full border-4 border-muted border-t-ceylon-gold"
                    />
                    <Compass className="absolute inset-0 m-auto w-8 h-8 text-ceylon-gold" />
                  </div>
                  <p className="text-muted-foreground text-sm animate-pulse">
                    Crafting your personalized itinerary…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Itinerary Results */}
            {itinerary.length > 0 && (
              <div ref={resultsRef} className="mt-8 space-y-4">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Your <span className="text-ceylon-gold">{numDays}-Day</span> Itinerary
                </h3>
                {itinerary.map((day, i) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-soft hover:shadow-medium transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-ceylon-gold/15 flex items-center justify-center">
                        <span className="font-display text-lg font-bold text-ceylon-gold">D{day.day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-lg font-semibold text-foreground mb-1">{day.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Route className="w-3.5 h-3.5" />
                          <span>{day.locations.join(" → ")}</span>
                          <span className="text-ceylon-ocean font-medium ml-auto">{day.distance_km} km</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{day.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {day.highlights.map((h) => (
                            <Badge key={h} variant="secondary" className="bg-ceylon-gold/10 text-ceylon-gold border-ceylon-gold/20 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              {h}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
