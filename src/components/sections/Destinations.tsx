import { motion } from "framer-motion";
import { 
  Mountain, 
  Landmark, 
  Train, 
  Cat, 
  Building2, 
  Waves,
  Clock,
  Star,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

import sigiriyaImg from "@/assets/sigiriya-climb.jpg";
import kandyImg from "@/assets/kandy-temple.jpg";
import ellaImg from "@/assets/ella-bridge.jpg";
import yalaImg from "@/assets/yala-leopard.jpg";
import galleImg from "@/assets/galle-fort.jpg";
import mirissaImg from "@/assets/mirissa-beach.jpg";

const destinations = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    subtitle: "Lion Rock",
    region: "Cultural Triangle",
    image: sigiriyaImg,
    icon: Mountain,
    description: "UNESCO World Heritage Site featuring the ancient rock fortress with stunning frescoes. The climb to the top offers breathtaking panoramic views.",
    highlights: ["Ancient Frescoes", "Lion Gate", "Royal Gardens"],
    bestTime: "Early Morning (6-9 AM)",
    difficulty: "Moderate",
    rating: 4.9,
    color: "from-ceylon-temple to-ceylon-gold",
    wikiUrl: "https://en.wikipedia.org/wiki/Sigiriya",
  },
  {
    id: "kandy",
    name: "Kandy",
    subtitle: "The Cultural Capital",
    region: "Hill Country",
    image: kandyImg,
    icon: Landmark,
    description: "Home to the sacred Temple of the Tooth Relic, this scenic city sits amidst misty hills and the beautiful Kandy Lake.",
    highlights: ["Temple of Tooth", "Botanical Gardens", "Kandy Lake"],
    bestTime: "Year Round",
    difficulty: "Easy",
    rating: 4.8,
    color: "from-ceylon-gold to-ceylon-temple",
    wikiUrl: "https://en.wikipedia.org/wiki/Kandy",
  },
  {
    id: "ella",
    name: "Ella",
    subtitle: "Hill Country Adventure",
    region: "Hill Country",
    image: ellaImg,
    icon: Train,
    description: "A charming mountain village known for the iconic Nine Arch Bridge, scenic hikes, and the world-famous Kandy-Ella train journey.",
    highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Scenic Train"],
    bestTime: "January - April",
    difficulty: "Moderate",
    rating: 4.9,
    color: "from-ceylon-green to-ceylon-ocean",
  },
  {
    id: "yala",
    name: "Yala National Park",
    subtitle: "Wildlife Safari",
    region: "Southern Province",
    image: yalaImg,
    icon: Cat,
    description: "One of the world's best places to spot leopards in the wild, alongside elephants, crocodiles, and over 200 bird species.",
    highlights: ["Leopard Watching", "Elephant Herds", "Bird Sanctuary"],
    bestTime: "February - July",
    difficulty: "Easy",
    rating: 4.7,
    color: "from-ceylon-green to-ceylon-temple",
  },
  {
    id: "galle",
    name: "Galle Fort",
    subtitle: "Colonial Heritage",
    region: "Southern Coast",
    image: galleImg,
    icon: Building2,
    description: "A UNESCO-listed Dutch colonial fortress featuring cobblestone streets, boutique shops, art galleries, and stunning ocean views.",
    highlights: ["Fort Walls Walk", "Dutch Architecture", "Boutique Shopping"],
    bestTime: "Year Round",
    difficulty: "Easy",
    rating: 4.8,
    color: "from-ceylon-ocean to-ceylon-ocean-deep",
  },
  {
    id: "mirissa",
    name: "Mirissa",
    subtitle: "Beach Paradise",
    region: "Southern Coast",
    image: mirissaImg,
    icon: Waves,
    description: "A tropical beach haven famous for blue whale watching, golden sandy beaches, and vibrant nightlife along the palm-fringed shore.",
    highlights: ["Whale Watching", "Parrot Rock", "Beach Relaxation"],
    bestTime: "November - April",
    difficulty: "Easy",
    rating: 4.6,
    color: "from-ceylon-ocean to-ceylon-green",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const Destinations = () => {
  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-ceylon-gold/10 text-ceylon-gold text-sm font-medium mb-4">
            Explore Sri Lanka
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Enchanting
            <span className="text-gradient-ocean block">Destinations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From ancient temples to pristine beaches, explore the diverse wonders 
            that make Sri Lanka the Pearl of the Indian Ocean.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 bg-card"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={`${destination.name} - ${destination.subtitle} in Sri Lanka`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t opacity-60 transition-opacity group-hover:opacity-70",
                  destination.color
                )} />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-medium">
                  <destination.icon className="w-6 h-6 text-ceylon-ocean" />
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-ceylon-gold fill-ceylon-gold" />
                  <span className="text-sm font-semibold text-foreground">{destination.rating}</span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-primary-foreground">
                    {destination.name}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">{destination.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Region */}
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{destination.region}</span>
                </div>

                {/* Description */}
                <p className="text-card-foreground/80 text-sm mb-4 line-clamp-3">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4 text-ceylon-green" />
                    <span className="text-muted-foreground">{destination.bestTime}</span>
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    destination.difficulty === "Easy" && "bg-ceylon-green/10 text-ceylon-green",
                    destination.difficulty === "Moderate" && "bg-ceylon-gold/10 text-ceylon-gold"
                  )}>
                    {destination.difficulty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
