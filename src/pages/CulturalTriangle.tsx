import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Landmark, Crown, BookOpen, Droplets, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GoogleMapSection } from "@/components/sections/GoogleMapSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import heroImg from "@/assets/cultural-triangle-hero.jpg";
import sigiriyaImg from "@/assets/sigiriya-climb.jpg";
import anuradhapuraImg from "@/assets/anuradhapura-ruins.jpg";
import polonnaruwaImg from "@/assets/polonnaruwa-ruins.jpg";
import dambullaImg from "@/assets/dambulla-cave.jpg";
import introImg from "@/assets/cultural-intro.jpg";
import galleryMoonstone from "@/assets/gallery-moonstone.jpg";
import galleryStupa from "@/assets/gallery-stupa.jpg";
import galleryFrescoes from "@/assets/gallery-frescoes.jpg";
import galleryIrrigation from "@/assets/gallery-irrigation.jpg";

const heritageSites = [
  {
    name: "Sigiriya Rock Fortress",
    image: sigiriyaImg,
    description: "A 5th-century royal citadel built atop a massive 200-meter rock column, adorned with ancient frescoes of celestial maidens and the remains of an elaborate palace complex with landscaped gardens.",
    wikiUrl: "https://en.wikipedia.org/wiki/Sigiriya",
  },
  {
    name: "Anuradhapura Sacred City",
    image: anuradhapuraImg,
    description: "The first capital of ancient Sri Lanka, home to colossal stupas, sacred Bo trees, and sprawling monasteries that served as centers of Buddhist learning for over a millennium.",
    wikiUrl: "https://en.wikipedia.org/wiki/Anuradhapura",
  },
  {
    name: "Polonnaruwa Ancient City",
    image: polonnaruwaImg,
    description: "A remarkably well-preserved medieval capital featuring royal palaces, intricately carved Hindu temples, and the iconic Gal Vihara with its monumental rock-cut Buddha statues.",
    wikiUrl: "https://en.wikipedia.org/wiki/Polonnaruwa",
  },
  {
    name: "Dambulla Cave Temple",
    image: dambullaImg,
    description: "A sacred complex of five cave temples housing over 150 Buddha statues and exquisite ceiling murals spanning 2,100 square meters — the largest and best-preserved cave temple complex in Sri Lanka.",
    wikiUrl: "https://en.wikipedia.org/wiki/Dambulla_cave_temple",
  },
];

const timelineEvents = [
  { era: "377 BCE – 1017 CE", title: "Anuradhapura Kingdom", description: "The longest-reigning dynasty in Sri Lankan history, establishing Theravada Buddhism and building massive irrigation systems." },
  { era: "1056 – 1232 CE", title: "Polonnaruwa Kingdom", description: "A golden age of art and architecture, producing remarkable stone sculptures, royal palaces, and advanced hydraulic engineering." },
];

const culturalHighlights = [
  { icon: Droplets, title: "Ancient Irrigation", description: "Sophisticated tank and canal systems engineered over 2,000 years ago that still function today — a testament to ancient Sri Lankan engineering genius." },
  { icon: Landmark, title: "Buddhist Temples", description: "Sacred spaces adorned with intricate stone carvings, golden stupas, and serene meditation halls that have drawn pilgrims for millennia." },
  { icon: Crown, title: "Royal Palaces", description: "Grand citadels and fortified complexes that once housed kings, featuring audience halls, bathing pools, and elaborate water gardens." },
  { icon: BookOpen, title: "Stone Carvings", description: "Exquisite moonstones, guard stones, and relief panels depicting mythological scenes — among the finest stone art in South Asia." },
];

const galleryImages = [
  { src: sigiriyaImg, alt: "Sigiriya Rock Fortress aerial view", caption: "Sigiriya Rock Fortress" },
  { src: galleryMoonstone, alt: "Ancient moonstone carving", caption: "Moonstone Carving" },
  { src: anuradhapuraImg, alt: "Anuradhapura sacred stupas", caption: "Sacred Stupas" },
  { src: galleryStupa, alt: "Ancient white stupa", caption: "Ruwanwelisaya" },
  { src: polonnaruwaImg, alt: "Polonnaruwa Buddha statues", caption: "Gal Vihara" },
  { src: galleryFrescoes, alt: "Sigiriya frescoes", caption: "Sigiriya Frescoes" },
  { src: dambullaImg, alt: "Dambulla cave interior", caption: "Cave Temple Interior" },
  { src: galleryIrrigation, alt: "Ancient irrigation reservoir", caption: "Ancient Reservoir" },
];

const mapLocations = [
  { name: "Sigiriya", x: 55, y: 38, description: "Lion Rock Fortress" },
  { name: "Anuradhapura", x: 45, y: 22, description: "Sacred Ancient Capital" },
  { name: "Polonnaruwa", x: 62, y: 35, description: "Medieval Capital" },
  { name: "Dambulla", x: 50, y: 35, description: "Cave Temple Complex" },
];

const CulturalTriangle = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen bg-ceylon-sand">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 left-6 z-50"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="bg-background/80 backdrop-blur-sm border border-border hover:bg-background rounded-full w-12 h-12 shadow-medium"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={heroImg} alt="Sigiriya Rock Fortress at sunrise" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsla(30,20%,10%,0.6)] via-[hsla(30,20%,10%,0.3)] to-[hsla(30,20%,10%,0.7)]" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-ceylon-gold-light font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            UNESCO World Heritage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            The Cultural Triangle
            <span className="block text-ceylon-gold text-4xl md:text-5xl lg:text-6xl mt-2">of Sri Lanka</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover the heart of Sri Lanka's ancient civilization, where sacred temples, royal cities,
            and magnificent monuments tell stories over 2,000 years old.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <a href="#introduction">
              <Button className="bg-ceylon-gold hover:bg-ceylon-gold-light text-ceylon-ocean-deep font-semibold px-8 py-6 text-lg rounded-full shadow-glow-gold transition-all duration-300">
                Explore the Heritage
              </Button>
            </a>
          </motion.div>
        </motion.div>
        <motion.a
          href="#introduction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-ceylon-gold transition-colors flex flex-col items-center"
        >
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.a>
      </section>

      {/* ─── INTRODUCTION ─── */}
      <section id="introduction" className="py-24 md:py-32 bg-ceylon-sand">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-ceylon-gold tracking-[0.2em] uppercase text-sm font-medium mb-3">The Heart of Ancient Lanka</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ceylon-ocean-deep mb-4">What is the Cultural Triangle?</h2>
            <div className="w-24 h-1 bg-ceylon-gold mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                The Cultural Triangle is a region in the heart of Sri Lanka that connects three ancient capitals —
                <strong className="text-ceylon-ocean-deep"> Anuradhapura</strong>,
                <strong className="text-ceylon-ocean-deep"> Polonnaruwa</strong>, and
                <strong className="text-ceylon-ocean-deep"> Kandy</strong> — forming a triangle that encompasses
                the island's most significant archaeological and historical treasures.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Within this sacred triangle lie the ruins of great kingdoms, colossal stupas that rival the Egyptian pyramids in scale,
                ancient reservoirs that showcase engineering brilliance, and cave temples adorned with centuries-old murals.
                Together, they form one of the richest concentrations of heritage sites in all of South Asia.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Four of these sites — Sigiriya, Anuradhapura, Polonnaruwa, and Dambulla — are UNESCO World Heritage Sites,
                recognized for their outstanding universal value to humanity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden shadow-large"
            >
              <img src={introImg} alt="Ancient stone carvings of Sri Lanka" className="w-full h-[400px] object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── HERITAGE SITES ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-ceylon-gold tracking-[0.2em] uppercase text-sm font-medium mb-3">Explore</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ceylon-ocean-deep mb-4">Featured Heritage Sites</h2>
            <div className="w-24 h-1 bg-ceylon-gold mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {heritageSites.map((site) => (
              <motion.div
                key={site.name}
                variants={itemVariants}
                className="group relative rounded-2xl overflow-hidden shadow-medium hover:shadow-large transition-shadow duration-500 bg-card"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <h3 className="absolute bottom-4 left-6 font-display text-2xl font-bold text-white drop-shadow-lg">
                    {site.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-foreground/70 leading-relaxed mb-4">{site.description}</p>
                  <a href={site.wikiUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-ceylon-gold hover:bg-ceylon-gold-light text-ceylon-ocean-deep font-semibold rounded-full px-6">
                      Learn More
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── INTERACTIVE MAP ─── */}
      <section className="py-24 md:py-32 bg-ceylon-sand">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-ceylon-gold tracking-[0.2em] uppercase text-sm font-medium mb-3">Navigate</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ceylon-ocean-deep mb-4">The Cultural Triangle Map</h2>
            <div className="w-24 h-1 bg-ceylon-gold mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GoogleMapSection />
          </motion.div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-ceylon-gold tracking-[0.2em] uppercase text-sm font-medium mb-3">Through the Ages</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ceylon-ocean-deep mb-4">Historical Timeline</h2>
            <div className="w-24 h-1 bg-ceylon-gold mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-ceylon-gold/30 hidden md:block" />

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center mb-16 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="inline-block px-4 py-1 rounded-full bg-ceylon-gold/15 text-ceylon-gold text-sm font-semibold mb-3">
                    {event.era}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-ceylon-ocean-deep mb-2">{event.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{event.description}</p>
                </div>
                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-ceylon-gold border-4 border-background shadow-glow-gold" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CULTURAL HIGHLIGHTS ─── */}
      <section className="py-24 md:py-32 bg-ceylon-sand">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-ceylon-gold tracking-[0.2em] uppercase text-sm font-medium mb-3">Heritage</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ceylon-ocean-deep mb-4">Cultural Highlights</h2>
            <div className="w-24 h-1 bg-ceylon-gold mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {culturalHighlights.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-card rounded-2xl p-8 text-center shadow-soft hover:shadow-medium transition-shadow duration-300 border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-ceylon-gold/15 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-ceylon-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-ceylon-ocean-deep mb-3">{item.title}</h3>
                <p className="text-foreground/65 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-ceylon-gold tracking-[0.2em] uppercase text-sm font-medium mb-3">Visual Journey</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ceylon-ocean-deep mb-4">Image Gallery</h2>
            <div className="w-24 h-1 bg-ceylon-gold mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-soft hover:shadow-large transition-shadow duration-300 ${
                  i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover min-h-[200px] transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <span className="text-white font-display font-semibold text-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {img.caption}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            className="absolute top-6 right-6 text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length); }}
            className="absolute left-4 md:left-8 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length); }}
            className="absolute right-4 md:right-8 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
          <div className="max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center font-display text-lg mt-4">{galleryImages[lightboxIndex].caption}</p>
          </div>
        </motion.div>
      )}

      {/* ─── DID YOU KNOW ─── */}
      <section className="py-20 bg-ceylon-sand">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-ceylon-gold/10 border border-ceylon-gold/30 rounded-2xl p-8 md:p-12 text-center"
          >
            <span className="text-4xl mb-4 block">💡</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-ceylon-ocean-deep mb-4">Did You Know?</h3>
            <p className="text-foreground/75 text-lg leading-relaxed">
              Sri Lanka has one of the highest densities of <strong className="text-ceylon-ocean-deep">UNESCO World Heritage Sites</strong> in
              the world — eight sites within just 65,610 square kilometers. The Cultural Triangle alone contains four of them,
              making it one of the most archaeologically rich regions on Earth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ceylon-ocean-deep/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Continue Your <span className="text-ceylon-gold">Journey</span>
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              The Cultural Triangle is just the beginning. Explore pristine beaches, misty highlands,
              and wildlife-rich jungles across this extraordinary island.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-ceylon-gold hover:bg-ceylon-gold-light text-ceylon-ocean-deep font-semibold px-10 py-6 text-lg rounded-full shadow-glow-gold transition-all duration-300"
            >
              Explore Sri Lanka's Wonders
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CulturalTriangle;
