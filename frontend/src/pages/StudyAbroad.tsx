import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { UniversitiesDialog } from "@/components/studyabroad/UniversitiesDialog";
import { getDestinations } from "@/services/api";

interface University {
  _id: string;
  name: string;
  ranking?: number;
  location?: string;
  destinationId: string;
}

interface Destination {
  _id: string;
  name: string;
  flag?: string;
  imageUrl?: string;
  shortDescription?: string;
  universityCount?: number;
  costRange?: string;
  workPermitRules?: string;
  duration?: string;
  highlights?: string[];
  universities?: University[];
}

const StudyAbroad = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations();
        setDestinations(response.data.data.destinations);
      } catch (error) {
        console.error("Failed to fetch destinations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleExploreUniversities = (destination: Destination) => {
    setSelectedDestination(destination);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">Loading destinations...</div>
      </Layout>
    );
  }

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
              Study <span className="text-accent">Abroad</span> Destinations
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Discover the perfect country for your international education journey. Compare destinations, costs, and opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {destinations.map((destination, index) => {
              const universityTotal = destination.universityCount ?? destination.universities?.length ?? 0;
              return (
                <motion.div
                  key={destination._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/5 relative aspect-video lg:aspect-auto overflow-hidden">
                      <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent lg:bg-gradient-to-r" />
                      <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8">
                        <span className="text-5xl mb-2 block">{destination.flag}</span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-background">
                          {destination.name}
                        </h3>
                      </div>
                    </div>
                    <div className="lg:w-3/5 p-6 lg:p-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{universityTotal}+</div>
                            <div className="text-xs text-muted-foreground">Universities</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-sm">{destination.costRange}</div>
                            <div className="text-xs text-muted-foreground">Yearly Cost</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{destination.duration}</div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-warning" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{destination.workPermitRules}</div>
                            <div className="text-xs text-muted-foreground">Part-time Work</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {(destination.highlights || []).map((highlight) => (
                          <div key={highlight} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success shrink-0" />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button onClick={() => handleExploreUniversities(destination)}>
                          Explore Universities
                        </Button>
                        <Link to="/contact">
                          <Button variant="outline">Get Free Counseling</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Not Sure Which Country to Choose?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our expert counselors can help you find the perfect destination based on your goals, budget, and preferences.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="hero">Book Free Consultation</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <UniversitiesDialog
        country={selectedDestination?.name || ""}
        flag={selectedDestination?.flag || ""}
        universities={selectedDestination?.universities || []}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Layout>
  );
};

export default StudyAbroad;
