import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Star, Quote, Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const successStories = [
  {
    name: "Sarah Johnson",
    from: "New York, USA",
    university: "Oxford University",
    program: "MBA",
    year: "2023",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    story: "GlobalStudy transformed my dream into reality. Their personalized guidance helped me navigate the complex application process for Oxford. From essay reviews to interview prep, they were with me every step.",
    scholarship: "$50,000",
  },
  {
    name: "Michael Chen",
    from: "Singapore",
    university: "MIT",
    program: "Computer Science",
    year: "2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    story: "I never thought I could get into MIT, but the team believed in me when I didn't. They helped me showcase my projects effectively and secure a research scholarship.",
    scholarship: "Full Ride",
  },
  {
    name: "Priya Sharma",
    from: "Mumbai, India",
    university: "University of Toronto",
    program: "Data Science",
    year: "2024",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    story: "The visa assistance was invaluable. They prepared me thoroughly for the interview and helped with all documentation. Now I'm living my dream in Canada!",
    scholarship: "$25,000",
  },
  {
    name: "Ahmed Hassan",
    from: "Dubai, UAE",
    university: "Imperial College London",
    program: "Engineering",
    year: "2023",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    story: "The team's knowledge of UK universities is exceptional. They matched me with the perfect program and helped me secure a prestigious scholarship.",
    scholarship: "$35,000",
  },
  {
    name: "Emma Williams",
    from: "Sydney, Australia",
    university: "Stanford University",
    program: "Business Analytics",
    year: "2024",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80",
    story: "From GMAT prep to final acceptance, GlobalStudy was my rock. Their expertise in US admissions gave me the edge I needed.",
    scholarship: "$40,000",
  },
  {
    name: "Carlos Rodriguez",
    from: "Mexico City, Mexico",
    university: "McGill University",
    program: "Medicine",
    year: "2023",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    story: "Getting into medical school abroad seemed impossible. But with their guidance, I'm now pursuing my MD at one of Canada's best universities.",
    scholarship: "$30,000",
  },
];

const stats = [
  { value: "50,000+", label: "Students Placed" },
  { value: "98%", label: "Success Rate" },
  { value: "$20M+", label: "Scholarships Secured" },
  { value: "200+", label: "University Partners" },
];

const Success = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Success <span className="text-accent">Stories</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-12">
              Real stories from real students who achieved their dreams with GlobalStudy.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-accent"
                  />
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.from}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-accent/30 mb-2" />
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  "{story.story}"
                </p>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">University</span>
                    <span className="text-sm font-medium text-foreground">{story.university}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Program</span>
                    <span className="text-sm font-medium text-foreground">{story.program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Scholarship</span>
                    <span className="text-sm font-bold text-success">{story.scholarship}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Watch Their Stories
            </h2>
            <p className="text-muted-foreground text-lg">
              Hear directly from our successful students about their journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-video rounded-2xl overflow-hidden bg-foreground/10 group cursor-pointer"
              >
                <img
                  src={successStories[index].image}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center group-hover:bg-foreground/50 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-accent-foreground fill-accent-foreground ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of students who have achieved their study abroad dreams with us.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="hero">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Success;
