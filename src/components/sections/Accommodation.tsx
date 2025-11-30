import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Star, 
  Wifi, 
  Waves, 
  Sparkles, 
  Wind, 
  Eye,
  ChefHat,
  Filter,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Region = "all" | "coastal" | "hillCountry" | "cultural" | "colombo";
type AccomType = "all" | "boutique" | "teaEstate" | "homestay" | "ecoLodge";
type PriceRange = "all" | "$" | "$$" | "$$$";

interface Accommodation {
  id: string;
  name: string;
  location: string;
  region: Region;
  type: AccomType;
  priceRange: PriceRange;
  rating: number;
  features: string[];
  featureIcons: React.ComponentType<{ className?: string }>[];
  description: string;
}

const accommodations: Accommodation[] = [
  {
    id: "1",
    name: "Ceylon Tea Trails",
    location: "Hatton, Hill Country",
    region: "hillCountry",
    type: "teaEstate",
    priceRange: "$$$",
    rating: 4.9,
    features: ["Infinity Pool", "Colonial Charm", "Private Chef"],
    featureIcons: [Waves, Sparkles, ChefHat],
    description: "Luxury tea bungalows set amidst rolling tea estates with butler service.",
  },
  {
    id: "2",
    name: "Jetwing Lighthouse",
    location: "Galle, Coastal South",
    region: "coastal",
    type: "boutique",
    priceRange: "$$$",
    rating: 4.8,
    features: ["Ocean View", "Ayurvedic Spa", "Pool"],
    featureIcons: [Eye, Sparkles, Waves],
    description: "Geoffrey Bawa-designed resort overlooking the Indian Ocean.",
  },
  {
    id: "3",
    name: "Cinnamon Wild Yala",
    location: "Yala, Southern Province",
    region: "coastal",
    type: "ecoLodge",
    priceRange: "$$",
    rating: 4.7,
    features: ["Safari Camp", "Wildlife", "Pool"],
    featureIcons: [Wind, Sparkles, Waves],
    description: "Eco-lodge on the edge of Yala National Park with wildlife sightings.",
  },
  {
    id: "4",
    name: "Heritage Kandalama",
    location: "Dambulla, Cultural Triangle",
    region: "cultural",
    type: "boutique",
    priceRange: "$$",
    rating: 4.6,
    features: ["Infinity Pool", "Lake View", "Wi-Fi"],
    featureIcons: [Waves, Eye, Wifi],
    description: "Award-winning eco-hotel blending into the rock face with stunning views.",
  },
  {
    id: "5",
    name: "Ellerton Villa",
    location: "Nuwara Eliya, Hill Country",
    region: "hillCountry",
    type: "homestay",
    priceRange: "$",
    rating: 4.5,
    features: ["Mountain View", "Fireplace", "Wi-Fi"],
    featureIcons: [Eye, Sparkles, Wifi],
    description: "Charming colonial-era guesthouse with warm hospitality and home cooking.",
  },
  {
    id: "6",
    name: "Colombo Courtyard",
    location: "Colombo, Western Province",
    region: "colombo",
    type: "boutique",
    priceRange: "$$",
    rating: 4.4,
    features: ["Rooftop Bar", "AC", "Wi-Fi"],
    featureIcons: [Sparkles, Wind, Wifi],
    description: "Modern boutique hotel in the heart of Colombo's vibrant city center.",
  },
];

const regionOptions = [
  { value: "all", label: "All Regions" },
  { value: "coastal", label: "Coastal South" },
  { value: "hillCountry", label: "Hill Country" },
  { value: "cultural", label: "Cultural Triangle" },
  { value: "colombo", label: "Colombo" },
];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "boutique", label: "Boutique Hotels" },
  { value: "teaEstate", label: "Tea Estate Bungalows" },
  { value: "homestay", label: "Homestays" },
  { value: "ecoLodge", label: "Eco-Lodges" },
];

const priceOptions = [
  { value: "all", label: "Any Price" },
  { value: "$", label: "Budget ($)" },
  { value: "$$", label: "Mid-Range ($$)" },
  { value: "$$$", label: "Luxury ($$$)" },
];

export const Accommodation = () => {
  const [regionFilter, setRegionFilter] = useState<Region>("all");
  const [typeFilter, setTypeFilter] = useState<AccomType>("all");
  const [priceFilter, setPriceFilter] = useState<PriceRange>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAccommodations = accommodations.filter((acc) => {
    if (regionFilter !== "all" && acc.region !== regionFilter) return false;
    if (typeFilter !== "all" && acc.type !== typeFilter) return false;
    if (priceFilter !== "all" && acc.priceRange !== priceFilter) return false;
    return true;
  });

  const activeFiltersCount = [regionFilter, typeFilter, priceFilter].filter(f => f !== "all").length;

  return (
    <section id="accommodation" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-ceylon-green/10 text-ceylon-green text-sm font-medium mb-4">
            Where to Stay
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Exceptional
            <span className="text-gradient-gold block">Accommodation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From luxury tea estate bungalows to boutique beach resorts, 
            find your perfect sanctuary in Sri Lanka.
          </p>
        </motion.div>

        {/* Filter Button (Mobile) */}
        <div className="md:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-ceylon-gold text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </span>
          </Button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "bg-card rounded-2xl shadow-soft p-6 mb-8",
            !showFilters && "hidden md:block"
          )}
        >
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h3 className="font-semibold text-foreground">Filter Results</h3>
            <button onClick={() => setShowFilters(false)}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Region Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Region
              </label>
              <div className="flex flex-wrap gap-2">
                {regionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRegionFilter(option.value as Region)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                      regionFilter === option.value
                        ? "bg-ceylon-ocean text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-ceylon-ocean/10"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Type
              </label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTypeFilter(option.value as AccomType)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                      typeFilter === option.value
                        ? "bg-ceylon-green text-accent-foreground"
                        : "bg-muted text-muted-foreground hover:bg-ceylon-green/10"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Price Range
              </label>
              <div className="flex flex-wrap gap-2">
                {priceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPriceFilter(option.value as PriceRange)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                      priceFilter === option.value
                        ? "bg-ceylon-gold text-secondary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-ceylon-gold/10"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing <span className="font-semibold text-foreground">{filteredAccommodations.length}</span> properties
        </p>

        {/* Accommodation Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredAccommodations.map((acc) => (
              <motion.div
                key={acc.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
              >
                {/* Header */}
                <div className="p-5 border-b border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-card-foreground group-hover:text-ceylon-ocean transition-colors">
                        {acc.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{acc.location}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "text-lg font-bold",
                      acc.priceRange === "$$$" && "text-ceylon-gold",
                      acc.priceRange === "$$" && "text-ceylon-ocean",
                      acc.priceRange === "$" && "text-ceylon-green"
                    )}>
                      {acc.priceRange}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-ceylon-gold fill-ceylon-gold" />
                    <span className="text-sm font-medium text-foreground">{acc.rating}</span>
                    <span className="text-sm text-muted-foreground">• {
                      typeOptions.find(t => t.value === acc.type)?.label
                    }</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-card-foreground/80 text-sm mb-4">
                    {acc.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {acc.features.map((feature, index) => {
                      const Icon = acc.featureIcons[index];
                      return (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                        >
                          <Icon className="w-3 h-3" />
                          {feature}
                        </span>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <Button variant="ocean" size="sm" className="w-full">
                    <MapPin className="w-4 h-4 mr-1" />
                    View on Map
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAccommodations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No accommodations match your filters. Try adjusting your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
