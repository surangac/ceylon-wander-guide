import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, TreePine, Shield, Bird, Camera, X, Binoculars, PawPrint, Leaf, MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import heroImg from "@/assets/safari-hero.jpg";
import introImg from "@/assets/safari-intro.jpg";
import yalaImg from "@/assets/safari-yala.jpg";
import wilpattuImg from "@/assets/safari-wilpattu.jpg";
import udawalaweImg from "@/assets/safari-udawalawe.jpg";
import minneriyaImg from "@/assets/safari-minneriya.jpg";
import leopardImg from "@/assets/safari-leopard.jpg";
import slothbearImg from "@/assets/safari-slothbear.jpg";
import birdsImg from "@/assets/safari-birds.jpg";
import jeepImg from "@/assets/safari-jeep.jpg";
import conservationImg from "@/assets/safari-conservation.jpg";
import forestImg from "@/assets/safari-forest.jpg";

const parks = [
  {
    name: "Yala National Park",
    subtitle: "Leopard Capital of the World",
    image: yalaImg,
    description: "Sri Lanka's most famous wildlife sanctuary boasts the highest density of leopards in the world. Spanning over 97,000 hectares, Yala is home to elephants, crocodiles, and over 200 bird species.",
    wiki: "https://en.wikipedia.org/wiki/Yala_National_Park",
  },
  {
    name: "Wilpattu National Park",
    subtitle: "Land of Natural Lakes",
    image: wilpattuImg,
    description: "The largest national park in Sri Lanka, Wilpattu is renowned for its unique natural lakes called 'villus.' This untouched wilderness shelters leopards, sloth bears, and a rich variety of birdlife.",
    wiki: "https://en.wikipedia.org/wiki/Wilpattu_National_Park",
  },
  {
    name: "Udawalawe National Park",
    subtitle: "Elephant Kingdom",
    image: udawalaweImg,
    description: "Home to nearly 600 wild elephants, Udawalawe offers some of the best elephant sightings in Asia. The park's open grasslands make spotting wildlife remarkably easy.",
    wiki: "https://en.wikipedia.org/wiki/Udawalawe_National_Park",
  },
  {
    name: "Minneriya National Park",
    subtitle: "The Great Gathering",
    image: minneriyaImg,
    description: "Famous for 'The Gathering' — one of the world's greatest wildlife spectacles where over 300 elephants converge around the ancient Minneriya reservoir during the dry season.",
    wiki: "https://en.wikipedia.org/wiki/Minneriya_National_Park",
  },
];

const wildlife = [
  { image: introImg, title: "Sri Lankan Elephants", fact: "Around 6,000 wild elephants roam Sri Lanka — one of the highest densities in Asia. They are integral to the island's cultural and ecological identity." },
  { image: leopardImg, title: "Sri Lankan Leopards", fact: "A unique subspecies found only on the island, the Sri Lankan leopard (Panthera pardus kotiya) is the apex predator of the island's jungles." },
  { image: slothbearImg, title: "Sloth Bears", fact: "Sri Lanka's endemic sloth bears inhabit the dry zone forests. These shy nocturnal creatures are best spotted in Wilpattu and Yala national parks." },
  { image: birdsImg, title: "Exotic Birds", fact: "With over 430 bird species — 33 of them endemic — Sri Lanka is a birdwatcher's paradise. From the Ceylon blue magpie to the vibrant kingfisher." },
];

const galleryImages = [
  { src: yalaImg, alt: "Yala leopard", label: "Leopard Territory" },
  { src: minneriyaImg, alt: "Elephant gathering", label: "The Gathering" },
  { src: forestImg, alt: "Dense jungle", label: "Tropical Forests" },
  { src: jeepImg, alt: "Safari jeep", label: "Safari Adventure" },
  { src: birdsImg, alt: "Exotic birds", label: "Birdwatching" },
  { src: wilpattuImg, alt: "Wilpattu lake", label: "Wilderness" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const WildlifeSafari = () => {
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
          <img src={heroImg} alt="Elephants walking through golden grassland at sunrise with safari jeep" className="w-full h-full object-cover scale-110" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <PawPrint className="w-4 h-4 text-ceylon-green" />
            <span className="text-sm font-medium text-white">26 National Parks & Reserves</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Sri Lanka's
            <span className="block text-ceylon-green">Wildlife Safari</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-serif">
            Discover incredible biodiversity and unforgettable encounters with wildlife.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
            <Button variant="nature" size="xl" onClick={() => document.getElementById("parks")?.scrollIntoView({ behavior: "smooth" })}>
              Start the Safari
            </Button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a href="#intro" className="flex flex-col items-center text-white/70 hover:text-ceylon-green transition-colors">
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
              <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">Wildlife Destination</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Asia's Premier <span className="text-ceylon-green">Wildlife Haven</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-serif">
                Despite its compact size, Sri Lanka is one of the most biodiverse places on Earth. The island's diverse ecosystems — from dry scrublands to tropical rainforests — support an extraordinary density of wildlife rarely seen anywhere else in Asia.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Home to the highest concentration of <strong className="text-foreground">leopards</strong> in the world, massive herds of <strong className="text-foreground">Asian elephants</strong>, elusive <strong className="text-foreground">sloth bears</strong>, and over <strong className="text-foreground">430 bird species</strong>, Sri Lanka's national parks deliver unforgettable safari experiences.
              </p>
              <div className="flex gap-8">
                {[{ value: "26", label: "National Parks" }, { value: "430+", label: "Bird Species" }, { value: "6,000", label: "Wild Elephants" }].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-2xl font-bold text-ceylon-green">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={introImg} alt="Wild elephant herd in Sri Lankan national park" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ceylon-green/10 flex items-center justify-center">
                    <TreePine className="w-5 h-5 text-ceylon-green" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Biodiversity Hotspot</div>
                    <div className="text-xs text-muted-foreground">Global Top 25</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. National Parks */}
      <section id="parks" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">National Parks</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Iconic <span className="text-ceylon-green">Safari Parks</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Four legendary national parks offering the best wildlife encounters on the island.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            {parks.map((park) => (
              <motion.div key={park.name} variants={fadeUp}>
                <Card className="group overflow-hidden border-border/50 hover:border-ceylon-green/30 transition-all duration-500 hover:shadow-xl bg-card">
                  <div className="relative h-64 overflow-hidden">
                    <img src={park.image} alt={park.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                        <MapPin className="w-3 h-3" />
                        {park.subtitle}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">{park.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">{park.description}</p>
                    <Button variant="ghost" className="text-ceylon-green hover:text-ceylon-green hover:bg-ceylon-green/10 p-0 h-auto font-semibold" asChild>
                      <a href={park.wiki} target="_blank" rel="noopener noreferrer">Learn More →</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Wildlife Spotlight */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">Iconic Species</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wildlife <span className="text-ceylon-green">Spotlight</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Meet the incredible creatures that call Sri Lanka's wilderness home.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wildlife.map((animal) => (
              <motion.div key={animal.title} variants={fadeUp}>
                <Card className="overflow-hidden border-border/50 hover:border-ceylon-green/30 hover:shadow-xl transition-all duration-500 bg-card group h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img src={animal.image} alt={animal.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <h3 className="absolute bottom-3 left-4 font-display text-lg font-bold text-white">{animal.title}</h3>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-muted-foreground text-sm leading-relaxed">{animal.fact}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Safari Experience */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={jeepImg} alt="Safari jeep at sunrise" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-2xl">
            <motion.span variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">The Experience</motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your Safari <span className="text-ceylon-green">Adventure</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 text-lg leading-relaxed mb-8 font-serif">
              A typical Sri Lankan safari begins at dawn, when the jungle stirs to life. Board a rugged 4x4 jeep with an expert tracker-guide who knows every trail, waterhole, and animal behavior. Glide silently through golden grasslands, past ancient trees, and along lakeshores where elephants bathe and leopards prowl.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6">
              {[
                { icon: Binoculars, label: "Expert Guides" },
                { icon: Camera, label: "Photo Safaris" },
                { icon: Eye, label: "Dawn & Dusk Tours" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-ceylon-green" />
                  </div>
                  <span className="text-white/90 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. Nature Conservation */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp} className="relative order-2 md:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={conservationImg} alt="Wildlife rangers monitoring elephants in sanctuary" className="w-full h-[450px] object-cover" />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 md:order-2">
              <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">Conservation</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Protecting Sri Lanka's <span className="text-ceylon-green">Wildlife</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-serif">
                Sri Lanka has a long history of wildlife protection, with some of the oldest conservation laws in Asia. Today, over 13% of the island is designated as protected areas.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "26 national parks and over 60 wildlife sanctuaries protect the island's biodiversity." },
                  { icon: Leaf, text: "Community-based conservation programs engage local villages in protecting wildlife corridors." },
                  { icon: Bird, text: "Elephant transit homes rehabilitate orphaned calves and release them back into the wild." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-ceylon-green/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-ceylon-green" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. Wildlife Gallery */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-ceylon-green font-semibold mb-4 block">Visual Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wildlife <span className="text-ceylon-green">Gallery</span>
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
              <PawPrint className="w-10 h-10 text-ceylon-green mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Did You Know?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed font-serif">
                Sri Lanka has the highest density of <strong className="text-foreground">leopards</strong> anywhere on Earth — with approximately <strong className="text-foreground">one leopard per square kilometer</strong> in Yala National Park. The island is also home to <strong className="text-foreground">91 species of mammals</strong> and <strong className="text-foreground">16 endemic species</strong> found nowhere else.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Call to Action */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={forestImg} alt="Dense tropical jungle forest" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready for Your <span className="text-ceylon-green">Wild Adventure?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/80 text-lg max-w-2xl mx-auto mb-10 font-serif">
              The wilderness awaits. Explore more of Sri Lanka's breathtaking natural wonders.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button variant="nature" size="xl" onClick={() => navigate("/")}>
                Explore Sri Lanka's Nature
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WildlifeSafari;
