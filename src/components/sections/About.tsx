import { motion } from "framer-motion";
import { Leaf, Users, Globe, Award, Heart, Shield } from "lucide-react";

const facts = [
  {
    icon: Globe,
    title: "Island Nation",
    description: "Sri Lanka is a tropical island in the Indian Ocean, just off the southeast coast of India.",
  },
  {
    icon: Leaf,
    title: "Ceylon Tea",
    description: "Famous worldwide for its premium tea, Sri Lanka is the 4th largest tea producer globally.",
  },
  {
    icon: Users,
    title: "Rich Heritage",
    description: "Over 2,500 years of documented history with 8 UNESCO World Heritage Sites.",
  },
  {
    icon: Award,
    title: "Biodiversity Hotspot",
    description: "Home to unique wildlife including Asian elephants, leopards, and over 430 bird species.",
  },
  {
    icon: Heart,
    title: "Warm Hospitality",
    description: '"Ayubowan" - May you live long. Sri Lankans are known for their genuine warmth and welcome.',
  },
  {
    icon: Shield,
    title: "Safe Travel",
    description: "Ranked among the friendliest countries for solo travelers and families alike.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const About = () => {
  return (
    <section id="about" className="py-24 bg-ceylon-ocean-deep relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="aboutPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-primary-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aboutPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-ceylon-gold/20 text-ceylon-gold text-sm font-medium mb-4">
            About Sri Lanka
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            The Pearl of the
            <span className="text-ceylon-gold block">Indian Ocean</span>
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Discover why this enchanting island has captivated travelers for centuries 
            with its natural beauty, ancient wisdom, and warm-hearted people.
          </p>
        </motion.div>

        {/* Facts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-ceylon-gold/20 flex items-center justify-center mb-4">
                <fact.icon className="w-6 h-6 text-ceylon-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                {fact.title}
              </h3>
              <p className="text-primary-foreground/70">{fact.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-ceylon-gold/10 backdrop-blur-sm rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "65,610", label: "km² Area" },
              { value: "22M+", label: "Population" },
              { value: "1,340", label: "km Coastline" },
              { value: "2,524m", label: "Highest Peak" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-display text-3xl md:text-4xl font-bold text-ceylon-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
