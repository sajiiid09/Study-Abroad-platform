import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    university: "Oxford University, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    text: "GlobalStudy made my dream of studying at Oxford a reality. Their guidance throughout the application process was invaluable.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    university: "MIT, USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    text: "The team's expertise in scholarship applications helped me secure a full scholarship. I couldn't have done it without them.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    university: "University of Toronto, Canada",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    text: "From course selection to visa approval, GlobalStudy was with me every step of the way. Highly recommend their services!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-hero text-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-background/10 text-background rounded-full text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Hear From Our{" "}
            <span className="text-accent">Successful</span> Students
          </h2>
          <p className="text-background/70 text-lg">
            Join thousands of students who have achieved their study abroad dreams with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background/5 backdrop-blur-lg rounded-2xl p-8 border border-background/10 hover:bg-background/10 transition-colors duration-300"
            >
              <Quote className="w-10 h-10 text-accent mb-6 opacity-50" />
              <p className="text-background/90 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-accent"
                />
                <div>
                  <h4 className="font-semibold text-background">{testimonial.name}</h4>
                  <p className="text-background/60 text-sm">{testimonial.university}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
