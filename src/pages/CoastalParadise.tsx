import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Waves, Anchor, Fish, Shell, Eye, MapPin, Camera, X, Compass, Sailboat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import heroImg from "@/assets/coastal-hero.jpg";
import introImg from "@/assets/coastal-intro.jpg";
import mirissaImg from "@/assets/coastal-mirissa.jpg";
import unawatunaImg from "@/assets/coastal-unawatuna.jpg";
import trincomaleeImg from "@/assets/coastal-trincomalee.jpg";
import arugamBayImg from "@/assets/coastal-arugambay.jpg";
import whaleImg from "@/assets/coastal-whale.jpg";
import sunsetImg from "@/assets/coastal-sunset.jpg";
import coralImg from "@/assets/coastal-coral.jpg";
import surfingImg from "@/assets/coastal-surfing.jpg";
import palmsImg from "@/assets/coastal-palms.jpg";
import dolphinsImg from "@/assets/coastal-dolphins.jpg";

const destinations = [
  {
    name: "Mirissa",
    subtitle: "Whale Watching Capital",
    image: mirissaImg,
    description: "Famous for its stunning crescent-shaped beach, Mirissa is Sri Lanka's premier whale watching destination. Spot blue whales, dolphins, and sea turtles in the warm Indian Ocean waters.",
  },
  {
    name: "Unawatuna",
    subtitle: "Coral Bay Paradise",
    image: unawatunaImg,
    description: "Known for its pristine coral reef and calm turquoise waters, Unawatuna is a sheltered bay perfect for snorkeling, diving, and relaxing under swaying palm trees.",
  },
  {
    name: "Trincomalee",
    subtitle: "Eastern Jewel",
    image: trincomaleeImg,
    description: "Home to some of the most beautiful beaches on Sri Lanka's eastern coast. Nilaveli and Uppuveli offer crystal-clear waters, excellent diving, and untouched natural beauty.",
  },
  {
    name: "Arugam Bay",
    subtitle: "Surfer's Paradise",
    image: arugamBayImg,
    description: "Ranked among the world's top 10 surfing spots, Arugam Bay draws wave riders from across the globe. Its laid-back vibe and perfect point breaks create an unforgettable surf experience.",
  },
];

const activities = [
  { icon: Waves, title: "Surfing", description: "World-class breaks at Arugam Bay, Hikkaduwa, and Weligama — perfect for beginners and pros alike." },
  { icon: Eye, title: "Snorkeling", description: "Explore vibrant coral gardens and tropical fish in the warm, crystal-clear waters off the southern coast." },
  { icon: Fish, title: "Whale Watching", description: "Witness majestic blue whales and playful dolphins on boat trips from Mirissa — peak season November to April." },
  { icon: Anchor, title: "Diving", description: "Discover shipwrecks, coral reefs, and marine life at world-renowned dive sites along the coastline." },
];

const marineLife = [
  { image: whaleImg, title: "Blue Whales", fact: "Sri Lanka's waters host the largest animals on Earth. The continental shelf off Mirissa is one of the best places to see them." },
  { image: dolphinsImg, title: "Dolphins & Turtles", fact: "Spinner dolphins travel in pods of hundreds, while five species of sea turtles nest on Sri Lankan beaches." },
  { image: coralImg, title: "Coral Reefs", fact: "Over 200 species of coral and 1,000 species of reef fish thrive in Sri Lanka's coastal waters, creating underwater wonderlands." },
];

const galleryImages = [
  { src: mirissaImg, alt: "Mirissa beach panorama", label: "Tropical Beaches" },
  { src: sunsetImg, alt: "Golden sunset over ocean", label: "Sunsets" },
  { src: palmsImg, alt: "Palm trees on golden sand", label: "Palm Trees" },
  { src: surfingImg, alt: "Surfer riding a wave", label: "Ocean Adventures" },
  { src: coralImg, alt: "Colorful coral reef underwater", label: "Underwater World" },
  { src: unawatunaImg, alt: "Coastal landscape", label: "Coastline" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const CoastalParadise = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroImg} alt="Aerial view of Sri Lanka's pristine tropical coastline" className="w-full h-full object-cover scale-110" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Waves className="w-4 h-4 text-ceylon-ocean" />
            <span className="text-sm font-medium text-white">1,600km of Coastline</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Sri Lanka's
            <span className="block text-ceylon-ocean">Coastal Paradise</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-serif">
            Explore crystal-clear waters, golden beaches, and unforgettable ocean adventures.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
            <Button variant="ocean" size="xl" onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}>
              Discover the Coast
            </Button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a href="#intro" className="flex flex-col items-center text-white/70 hover:text-ceylon-ocean transition-colors">
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* 2. Introduction */}
      <section id="intro" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp}>
              <span className="text-sm uppercase tracking-[0.2em] text-ceylon-ocean font-semibold mb-4 block">Tropical Coastline</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Where Ocean Meets <span className="text-ceylon-ocean">Golden Shores</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-serif">
                Sri Lanka's 1,600-kilometer coastline is a tropical paradise of golden beaches, turquoise waters, and vibrant marine life. From the whale-watching waters of Mirissa to the legendary surf breaks of Arugam Bay, every stretch of coast tells a different story.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                The island's coastal regions offer a perfect blend of relaxation and adventure. Discover pristine beaches like <strong className="text-foreground">Mirissa</strong>, snorkel the coral reefs of <strong className="text-foreground">Unawatuna</strong>, explore the eastern beauty of <strong className="text-foreground">Trincomalee</strong>, and ride world-class waves at <strong className="text-foreground">Arugam Bay</strong>.
              </p>
              <div className="flex gap-8">
                {[{ value: "1,600km", label: "Coastline" }, { value: "28°C", label: "Avg. Water" }, { value: "200+", label: "Coral Species" }].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-2xl font-bold text-ceylon-ocean">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={introImg} alt="Sri Lankan tropical coastline with fishing boats" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ceylon-ocean/10 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-ceylon-ocean" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Indian Ocean</div>
                    <div className="text-xs text-muted-foreground">Tropical Waters</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Beach Destinations */}
      <section id="destinations" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-ocean font-semibold mb-4 block">Beach Destinations</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured <span className="text-ceylon-ocean">Beaches</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Four iconic coastal gems, each offering a unique experience along Sri Lanka's stunning shoreline.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            {destinations.map((dest) => (
              <motion.div key={dest.name} variants={fadeUp}>
                <Card className="group overflow-hidden border-border/50 hover:border-ceylon-ocean/30 transition-all duration-500 hover:shadow-xl bg-card">
                  <div className="relative h-64 overflow-hidden">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                        <MapPin className="w-3 h-3" />
                        {dest.subtitle}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">{dest.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">{dest.description}</p>
                    <Button variant="ghost" className="text-ceylon-ocean hover:text-ceylon-ocean hover:bg-ceylon-ocean/10 p-0 h-auto font-semibold">
                      Explore More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Ocean Activities */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-ocean font-semibold mb-4 block">Water Sports</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ocean <span className="text-ceylon-ocean">Activities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Dive into thrilling adventures across Sri Lanka's warm tropical waters.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((a) => (
              <motion.div key={a.title} variants={fadeUp}>
                <Card className="text-center p-8 border-border/50 hover:border-ceylon-ocean/30 hover:shadow-lg transition-all duration-500 bg-card group h-full">
                  <div className="w-16 h-16 rounded-2xl bg-ceylon-ocean/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-ceylon-ocean/20 transition-colors">
                    <a.icon className="w-7 h-7 text-ceylon-ocean" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{a.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Marine Life */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-ocean font-semibold mb-4 block">Ocean Wildlife</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Marine <span className="text-ceylon-ocean">Life</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Sri Lanka's waters teem with extraordinary marine creatures.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {marineLife.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <Card className="overflow-hidden border-border/50 hover:shadow-xl transition-all duration-500 bg-card group">
                  <div className="relative h-56 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.fact}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Sunset Gallery */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-ocean font-semibold mb-4 block">Visual Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Coastal <span className="text-ceylon-ocean">Gallery</span>
            </h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} variants={fadeUp} className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square" onClick={() => setLightboxImg(img.src)}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <Camera className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-white font-semibold text-sm">{img.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button onClick={() => setLightboxImg(null)} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
          <img src={lightboxImg} alt="Gallery full view" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </div>
      )}

      {/* 7. Fun Fact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="bg-ceylon-ocean/10 border border-ceylon-ocean/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <Shell className="w-10 h-10 text-ceylon-ocean mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Did You Know?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed font-serif">
                Sri Lanka's coastline stretches <strong className="text-foreground">1,600 kilometers</strong> around the island. Its waters are home to over <strong className="text-foreground">26 species of whales and dolphins</strong>, making it one of the world's top marine biodiversity hotspots.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. Call to Action */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={sunsetImg} alt="Sunset over Sri Lankan coastline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready for Your <span className="text-ceylon-ocean">Coastal Escape?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 text-lg max-w-2xl mx-auto mb-10 font-serif">
              The ocean awaits. Explore more of Sri Lanka's breathtaking wonders.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button variant="ocean" size="xl" onClick={() => navigate("/")}>
                Explore Sri Lanka's Wonders
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoastalParadise;
