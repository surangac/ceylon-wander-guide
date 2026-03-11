import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const teamMembers = [
  {
    name: "Dulara Sayumdee",
    initial: "D",
    role: "Co-Founder",
    tagline: "Bringing Sri Lanka's hidden stories to life, one journey at a time.",
  },
  {
    name: "Sithuki Sanya",
    initial: "S",
    role: "Co-Founder",
    tagline: "Crafting authentic encounters with tradition, art, and local heritage.",
  },
  {
    name: "Vinuthi Thimansa",
    initial: "V",
    role: "Co-Founder",
    tagline: "Your guide to breathtaking trails, wildlife, and unforgettable sunsets.",
  },
  {
    name: "Senuthi Disansa",
    initial: "S",
    role: "Co-Founder",
    tagline: "Ensuring every traveler feels welcomed, cared for, and inspired.",
  },
];

export const Team = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Passionate locals and travel experts dedicated to helping you discover the true heart of Sri Lanka.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gold accent bar */}
              <div className="h-1.5 bg-ceylon-gold" />

              <div className="p-6 flex flex-col items-center text-center">
                {/* Avatar with pin badge */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-ceylon-ocean-deep flex items-center justify-center text-2xl font-display font-bold text-primary-foreground">
                    {member.initial}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-ceylon-gold flex items-center justify-center shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold tracking-widest uppercase text-ceylon-gold mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
