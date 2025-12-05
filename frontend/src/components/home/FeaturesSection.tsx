import { motion } from "framer-motion";
import { BookOpen, Globe, Users, Award, Clock, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to 200+ partner universities across 30+ countries worldwide.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    title: "Expert Counseling",
    description: "Personalized guidance from certified education consultants.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Award,
    title: "Scholarship Support",
    description: "Assistance in finding and applying for scholarships and financial aid.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Users,
    title: "Visa Assistance",
    description: "Complete support for visa documentation and interview preparation.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Streamlined application process with quick turnaround times.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Support",
    description: "Ongoing assistance even after you arrive at your destination.",
    color: "bg-accent/10 text-accent",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need for Your{" "}
            <span className="text-gradient-primary">Study Abroad</span> Journey
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide comprehensive support at every step of your educational journey, 
            from course selection to post-arrival assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
