import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-accent rounded-3xl p-12 lg:p-20 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-background/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-background/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-6">
              Ready to Start Your International Education Journey?
            </h2>
            <p className="text-accent-foreground/80 text-lg mb-10">
              Book a free consultation with our expert counselors and take the first step 
              towards your dream university today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="xl" className="bg-background text-accent hover:bg-background/90 font-bold">
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="xl" variant="hero-outline" className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10">
                <Phone className="w-5 h-5" />
                Call Us Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
