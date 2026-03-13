import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, MapPin, Mountain, Waves, Landmark, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-sigiriya.jpg";
import { useTripPlanner } from "@/components/trip-planner/TripPlannerContext";
const destinationsInfo = [{
  icon: Mountain,
  title: "Cultural Triangle",
  description: "Explore ancient ruins, UNESCO World Heritage sites including Sigiriya, Polonnaruwa, and Anuradhapura."
}, {
  icon: Landmark,
  title: "Hill Country",
  description: "Misty tea plantations, scenic train rides, and charming colonial hill stations like Nuwara Eliya and Ella."
}, {
  icon: Waves,
  title: "Coastal Paradise",
  description: "Pristine beaches from Mirissa to Trincomalee, world-class surfing, and whale watching adventures."
}, {
  icon: Sun,
  title: "Wildlife Safari",
  description: "Home to leopards, elephants, and over 430 bird species across national parks like Yala and Wilpattu."
}];
export const Hero = () => {
  const [showDestinations, setShowDestinations] = useState(false);
  const { open: openTripPlanner } = useTripPlanner();
  const navigate = useNavigate();
  return <>
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Sigiriya Lion Rock at golden hour - Sri Lanka's iconic ancient fortress" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="max-w-4xl mx-auto">
          {/* Tagline */}
          <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.6
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
            <Sparkles className="w-4 h-4 text-ceylon-gold" />
            <span className="text-sm font-medium text-primary-foreground">
              Discover the Pearl of the Indian Ocean
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] tracking-wide">
            Ceylon
            <span className="block text-ceylon-gold drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">HeritageAI</span>
          </motion.h1>

          {/* Description */}
          <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.5
          }} className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Embark on an unforgettable journey through ancient temples, misty tea plantations, 
            pristine beaches, and wildlife-rich jungles of Sri Lanka.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.7
          }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" onClick={() => setShowDestinations(true)}>
              Explore Destinations
            </Button>
            <Button variant="heroOutline" size="xl" onClick={openTripPlanner}>
              Plan Your Trip
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 1,
            delay: 1
          }} className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            {[{
              value: "8",
              label: "UNESCO Sites"
            }, {
              value: "1,340+",
              label: "Wildlife Species"
            }, {
              value: "1,600km",
              label: "Coastline"
            }].map((stat, index) => <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-ceylon-gold">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
              </div>)}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 1.2
      }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#destinations" className="flex flex-col items-center text-primary-foreground/70 hover:text-ceylon-gold transition-colors">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <motion.div animate={{
            y: [0, 8, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </a>
      </motion.div>

      {/* Explore Destinations Dialog */}
      <Dialog open={showDestinations} onOpenChange={setShowDestinations}>
        <DialogContent className="sm:max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl md:text-3xl text-foreground">
              Explore Sri Lanka's <span className="text-ceylon-gold">Wonders</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Discover the diverse landscapes and experiences awaiting you in the Pearl of the Indian Ocean.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {destinationsInfo.map((item, index) => <div
                key={index}
                className={`p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors ${
                  (item.title === "Cultural Triangle" || item.title === "Hill Country" || item.title === "Coastal Paradise") ? "cursor-pointer ring-1 ring-ceylon-gold/30 hover:ring-ceylon-gold/60" : ""
                }`}
                onClick={
                  item.title === "Cultural Triangle" ? () => { setShowDestinations(false); navigate("/cultural-triangle"); } :
                  item.title === "Hill Country" ? () => { setShowDestinations(false); navigate("/hill-country"); } :
                  item.title === "Coastal Paradise" ? () => { setShowDestinations(false); navigate("/coastal-paradise"); } :
                  item.title === "Wildlife Safari" ? () => { setShowDestinations(false); navigate("/wildlife-safari"); } :
                  undefined
                }
              >
                <div className="w-10 h-10 rounded-lg bg-ceylon-ocean/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-ceylon-ocean" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {(item.title === "Cultural Triangle" || item.title === "Hill Country" || item.title === "Coastal Paradise") && (
                  <span className="inline-block mt-2 text-xs font-semibold text-ceylon-gold">Explore →</span>
                )}
              </div>)}
          </div>
          <div className="mt-4 p-4 rounded-xl bg-ceylon-gold/10 border border-ceylon-gold/20">
            <p className="text-sm text-foreground">
              <strong className="text-ceylon-gold">Did you know?</strong> Sri Lanka has 8 UNESCO World Heritage Sites, 
              the highest concentration per square kilometer in the world!
            </p>
          </div>
        </DialogContent>
      </Dialog>


    </section>
    </>;
};