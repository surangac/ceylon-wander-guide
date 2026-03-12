import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Mountain, TreePine, Train, Coffee, Droplets, Eye, MapPin, Camera, Leaf, Footprints, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import heroImg from "@/assets/hill-country-hero.jpg";
import introImg from "@/assets/hill-intro.jpg";
import nuwaraEliyaImg from "@/assets/nuwara-eliya.jpg";
import ellaImg from "@/assets/ella-town.jpg";
import kandyImg from "@/assets/kandy-city.jpg";
import hortonImg from "@/assets/horton-plains.jpg";
import trainImg from "@/assets/hill-train.jpg";
import teaPickingImg from "@/assets/tea-picking.jpg";
import waterfallImg from "@/assets/hill-waterfall.jpg";
import viewpointImg from "@/assets/hill-viewpoint.jpg";
import hikingImg from "@/assets/hill-hiking.jpg";
import galleryTeaImg from "@/assets/gallery-tea-rows.jpg";
import galleryMistyImg from "@/assets/gallery-misty-mountains.jpg";

const destinations = [
  {
    name: "Nuwara Eliya",
    subtitle: "Little England",
    image: nuwaraEliyaImg,
    description: "Known as 'Little England,' Nuwara Eliya captivates with its cool climate, manicured gardens, colonial architecture, and endless tea estates stretching across emerald hillsides.",
  },
  {
    name: "Ella",
    subtitle: "Mountain Paradise",
    image: ellaImg,
    description: "A beloved mountain town offering stunning viewpoints, the iconic Nine Arches Bridge, world-class hiking trails, and a laid-back atmosphere that makes visitors never want to leave.",
  },
  {
    name: "Kandy",
    subtitle: "Sacred Heritage City",
    image: kandyImg,
    description: "Sri Lanka's cultural capital, surrounded by mountains and home to the sacred Temple of the Tooth. A city where ancient traditions meet misty highland beauty.",
  },
  {
    name: "Horton Plains",
    subtitle: "World's End",
    image: hortonImg,
    description: "A dramatic national park featuring cloud forests, rare wildlife, and the breathtaking 880-meter drop at World's End — one of the most spectacular viewpoints in Asia.",
  },
];

const adventures = [
  { icon: Footprints, title: "Hiking", description: "Trek through cloud forests and tea-covered hillsides on trails ranging from easy walks to challenging climbs." },
  { icon: Droplets, title: "Waterfalls", description: "Discover over 100 waterfalls including Bambarakanda, Sri Lanka's tallest at 263 meters." },
  { icon: Eye, title: "Scenic Viewpoints", description: "From Ella Rock to Little Adam's Peak, enjoy panoramic vistas of endless mountain ranges." },
  { icon: TreePine, title: "Nature Trails", description: "Explore pristine ecosystems in Horton Plains and Knuckles Mountain Range cloud forests." },
];

const galleryImages = [
  { src: galleryTeaImg, alt: "Tea plantation rows at golden hour", label: "Tea Plantations" },
  { src: waterfallImg, alt: "Majestic waterfall in hill country", label: "Waterfalls" },
  { src: galleryMistyImg, alt: "Misty mountain layers at dawn", label: "Mountain Views" },
  { src: trainImg, alt: "Scenic train crossing bridge", label: "Train Journeys" },
  { src: hikingImg, alt: "Cloud forest hiking trail", label: "Cloud Forests" },
  { src: viewpointImg, alt: "Sunrise from mountain viewpoint", label: "Viewpoints" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const HillCountry = () => {
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
          <img src={heroImg} alt="Sri Lanka hill country panorama with tea plantations and misty mountains" className="w-full h-full object-cover scale-110" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Mountain className="w-4 h-4 text-ceylon-green" />
            <span className="text-sm font-medium text-white">Elevation 1,000 – 2,500m</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Sri Lanka's Beautiful
            <span className="block text-ceylon-green-light">Hill Country</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-serif">
            Experience misty mountains, lush tea estates, scenic train rides, and breathtaking landscapes.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
            <Button variant="nature" size="xl" onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}>
              Explore the Highlands
            </Button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a href="#intro" className="flex flex-col items-center text-white/70 hover:text-ceylon-green-light transition-colors">
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
              <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">Discover the Highlands</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Where Mist Meets <span className="text-ceylon-green">Emerald Hills</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-serif">
                Sri Lanka's Hill Country is a breathtaking region of cool climates, rolling tea plantations, and misty peaks that rise above the tropical lowlands. For centuries, travelers have been enchanted by its serene beauty and gentle pace of life.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Home to some of the world's finest tea estates, charming colonial hill stations, and dramatic mountain scenery, the Hill Country offers an escape into nature's most peaceful embrace. Key destinations include <strong className="text-foreground">Nuwara Eliya</strong>, <strong className="text-foreground">Ella</strong>, <strong className="text-foreground">Kandy</strong>, and <strong className="text-foreground">Horton Plains</strong>.
              </p>
              <div className="flex gap-8">
                {[{ value: "2,524m", label: "Highest Peak" }, { value: "15°C", label: "Avg. Temp" }, { value: "100+", label: "Waterfalls" }].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-2xl font-bold text-ceylon-green">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={introImg} alt="Winding path through lush green tea hills" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ceylon-green/10 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-ceylon-green" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Ceylon Tea Origin</div>
                    <div className="text-xs text-muted-foreground">Since 1867</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Top Destinations */}
      <section id="destinations" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">Must-Visit Places</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Top <span className="text-ceylon-green">Destinations</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Four extraordinary highland gems, each offering a unique window into Sri Lanka's mountainous heart.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            {destinations.map((dest) => (
              <motion.div key={dest.name} variants={fadeUp}>
                <Card className="group overflow-hidden border-border/50 hover:border-ceylon-green/30 transition-all duration-500 hover:shadow-xl bg-card">
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
                    <Button variant="ghost" className="text-ceylon-green hover:text-ceylon-green hover:bg-ceylon-green/10 p-0 h-auto font-semibold">
                      Discover More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Scenic Train Experience */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={trainImg} alt="Scenic train crossing Nine Arches Bridge" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-2xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Train className="w-4 h-4 text-ceylon-green-light" />
              <span className="text-sm text-white/90">Iconic Railway Journey</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The World's Most <span className="text-ceylon-green-light">Scenic Train Ride</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 text-lg leading-relaxed mb-6 font-serif">
              The railway journey from Kandy to Ella is consistently ranked among the most beautiful train rides on Earth. Winding through emerald tea plantations, crossing dramatic viaducts, and passing through misty tunnels, this 7-hour journey is an unforgettable experience.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mt-10">
              {[{ value: "7hrs", label: "Journey Time" }, { value: "160km", label: "Distance" }, { value: "44", label: "Tunnels" }].map((s) => (
                <div key={s.label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="font-display text-2xl font-bold text-ceylon-green-light">{s.value}</div>
                  <div className="text-xs text-white/60 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. Tea Plantation Story */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp} className="order-2 md:order-1 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={teaPickingImg} alt="Tea pickers harvesting leaves on hillside" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -top-6 -right-6 bg-card rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ceylon-green/10 flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-ceylon-green" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">4th Largest</div>
                    <div className="text-xs text-muted-foreground">Tea Producer</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 md:order-2">
              <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">A Legacy of Flavor</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                The Story of <span className="text-ceylon-green">Ceylon Tea</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-serif">
                In 1867, Scottish planter James Taylor established the first commercial tea plantation in Kandy, forever transforming Sri Lanka's highlands. Today, the island is the world's 4th largest tea producer, renowned for the exceptional quality of its highland-grown leaves.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                The unique combination of altitude, rainfall, and cool temperatures creates teas with distinctive character — from the delicate golden liquor of Nuwara Eliya teas to the robust, full-bodied flavors of Uva region. Visiting a working plantation offers an intimate glimpse into this centuries-old craft.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Hand-picked leaves", "Sun-withered", "Rolled & oxidized", "Fired to perfection"].map((step, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-ceylon-green/10 text-ceylon-green text-sm font-medium border border-ceylon-green/20">
                    {step}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. Nature & Adventure */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">Outdoor Activities</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nature & <span className="text-ceylon-green">Adventure</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">The hill country is an adventurer's playground with trails, waterfalls, and viewpoints waiting to be explored.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adventures.map((a) => (
              <motion.div key={a.title} variants={fadeUp}>
                <Card className="text-center p-8 border-border/50 hover:border-ceylon-green/30 hover:shadow-lg transition-all duration-500 bg-card group h-full">
                  <div className="w-16 h-16 rounded-2xl bg-ceylon-green/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-ceylon-green/20 transition-colors">
                    <a.icon className="w-7 h-7 text-ceylon-green" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{a.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Image Gallery */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">Visual Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hill Country <span className="text-ceylon-green">Gallery</span>
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

      {/* 8. Fun Fact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="bg-ceylon-green/10 border border-ceylon-green/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <Leaf className="w-10 h-10 text-ceylon-green mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Did You Know?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed font-serif">
                Sri Lanka produces approximately <strong className="text-foreground">340 million kg</strong> of tea annually. The hill country's unique micro-climates produce seven distinct regional flavors, making Ceylon tea one of the most diverse single-origin teas in the world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Call to Action */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={viewpointImg} alt="Sunrise viewpoint over hill country" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready for Your <span className="text-ceylon-green-light">Highland Adventure?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 text-lg max-w-2xl mx-auto mb-10 font-serif">
              The misty mountains are calling. Explore more of Sri Lanka's breathtaking wonders.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button variant="nature" size="xl" onClick={() => navigate("/")}>
                Discover More Sri Lankan Wonders
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HillCountry;
