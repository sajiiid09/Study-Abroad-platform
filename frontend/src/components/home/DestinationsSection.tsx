import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  {
    country: "United Kingdom",
    universities: "150+ Universities",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    flag: "🇬🇧",
  },
  {
    country: "United States",
    universities: "200+ Universities",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
    flag: "🇺🇸",
  },
  {
    country: "Canada",
    universities: "100+ Universities",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    flag: "🇨🇦",
  },
  {
    country: "Australia",
    universities: "80+ Universities",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
    flag: "🇦🇺",
  },
];

export const DestinationsSection = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Top Destinations
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Explore Popular{" "}
              <span className="text-gradient-accent">Study Destinations</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose from our curated list of top study destinations with world-renowned universities.
            </p>
          </motion.div>
          <Link to="/study-abroad">
            <Button variant="outline" size="lg">
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={destination.image}
                alt={destination.country}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-4xl mb-2 block">{destination.flag}</span>
                <h3 className="font-display text-xl font-bold text-background mb-1">
                  {destination.country}
                </h3>
                <p className="text-background/70 text-sm">{destination.universities}</p>
              </div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
