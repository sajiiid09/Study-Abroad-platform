import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { UniversitiesDialog } from "@/components/studyabroad/UniversitiesDialog";

interface University {
  name: string;
  worldRanking: number;
  city: string;
  specialties: string[];
}

interface Destination {
  country: string;
  flag: string;
  universities: number;
  avgCost: string;
  duration: string;
  workHours: string;
  image: string;
  highlights: string[];
  topUniversities: University[];
}

const destinations: Destination[] = [
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    universities: 150,
    avgCost: "$15,000 - $35,000",
    duration: "3-4 years",
    workHours: "20 hrs/week",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    highlights: ["World-renowned universities", "Post-study work visa", "Rich cultural heritage", "Strong research programs"],
    topUniversities: [
      { name: "University of Oxford", worldRanking: 3, city: "Oxford", specialties: ["Law", "Medicine", "Humanities"] },
      { name: "University of Cambridge", worldRanking: 2, city: "Cambridge", specialties: ["Sciences", "Engineering", "Mathematics"] },
      { name: "Imperial College London", worldRanking: 6, city: "London", specialties: ["Engineering", "Medicine", "Business"] },
      { name: "University College London", worldRanking: 9, city: "London", specialties: ["Arts", "Sciences", "Law"] },
      { name: "University of Edinburgh", worldRanking: 22, city: "Edinburgh", specialties: ["Medicine", "AI", "Informatics"] },
    ],
  },
  {
    country: "United States",
    flag: "🇺🇸",
    universities: 200,
    avgCost: "$20,000 - $50,000",
    duration: "4 years",
    workHours: "20 hrs/week",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
    highlights: ["Top global rankings", "OPT opportunities", "Diverse campus life", "Research excellence"],
    topUniversities: [
      { name: "Massachusetts Institute of Technology", worldRanking: 1, city: "Cambridge, MA", specialties: ["Engineering", "Computer Science", "AI"] },
      { name: "Stanford University", worldRanking: 5, city: "Stanford, CA", specialties: ["Business", "Engineering", "Computer Science"] },
      { name: "Harvard University", worldRanking: 4, city: "Cambridge, MA", specialties: ["Law", "Medicine", "Business"] },
      { name: "California Institute of Technology", worldRanking: 15, city: "Pasadena, CA", specialties: ["Sciences", "Engineering", "Physics"] },
      { name: "University of Chicago", worldRanking: 11, city: "Chicago, IL", specialties: ["Economics", "Business", "Law"] },
    ],
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    universities: 100,
    avgCost: "$12,000 - $30,000",
    duration: "3-4 years",
    workHours: "20 hrs/week",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    highlights: ["Immigration pathways", "Quality education", "Safe environment", "Multicultural society"],
    topUniversities: [
      { name: "University of Toronto", worldRanking: 21, city: "Toronto", specialties: ["Medicine", "Engineering", "Business"] },
      { name: "McGill University", worldRanking: 30, city: "Montreal", specialties: ["Medicine", "Law", "Sciences"] },
      { name: "University of British Columbia", worldRanking: 34, city: "Vancouver", specialties: ["Forestry", "Sciences", "Business"] },
      { name: "University of Alberta", worldRanking: 111, city: "Edmonton", specialties: ["Engineering", "Sciences", "Medicine"] },
      { name: "University of Waterloo", worldRanking: 112, city: "Waterloo", specialties: ["Computer Science", "Engineering", "Mathematics"] },
    ],
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    universities: 80,
    avgCost: "$15,000 - $33,000",
    duration: "3 years",
    workHours: "24 hrs/week",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
    highlights: ["Post-study work rights", "High quality of life", "Strong economy", "Beautiful landscapes"],
    topUniversities: [
      { name: "University of Melbourne", worldRanking: 14, city: "Melbourne", specialties: ["Medicine", "Law", "Arts"] },
      { name: "University of Sydney", worldRanking: 19, city: "Sydney", specialties: ["Business", "Engineering", "Medicine"] },
      { name: "Australian National University", worldRanking: 34, city: "Canberra", specialties: ["Politics", "Sciences", "Law"] },
      { name: "University of Queensland", worldRanking: 43, city: "Brisbane", specialties: ["Sciences", "Engineering", "Medicine"] },
      { name: "Monash University", worldRanking: 42, city: "Melbourne", specialties: ["Pharmacy", "Engineering", "Business"] },
    ],
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    universities: 120,
    avgCost: "$0 - $15,000",
    duration: "3-4 years",
    workHours: "20 hrs/week",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    highlights: ["Free/low tuition", "Engineering excellence", "Strong economy", "Central European location"],
    topUniversities: [
      { name: "Technical University of Munich", worldRanking: 37, city: "Munich", specialties: ["Engineering", "Computer Science", "Sciences"] },
      { name: "Ludwig Maximilian University", worldRanking: 54, city: "Munich", specialties: ["Medicine", "Law", "Humanities"] },
      { name: "Heidelberg University", worldRanking: 87, city: "Heidelberg", specialties: ["Medicine", "Sciences", "Humanities"] },
      { name: "Humboldt University of Berlin", worldRanking: 120, city: "Berlin", specialties: ["Arts", "Humanities", "Sciences"] },
      { name: "RWTH Aachen University", worldRanking: 106, city: "Aachen", specialties: ["Engineering", "Technology", "Sciences"] },
    ],
  },
  {
    country: "New Zealand",
    flag: "🇳🇿",
    universities: 40,
    avgCost: "$12,000 - $25,000",
    duration: "3 years",
    workHours: "20 hrs/week",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
    highlights: ["Work visa pathway", "Safe country", "Stunning nature", "Quality education"],
    topUniversities: [
      { name: "University of Auckland", worldRanking: 68, city: "Auckland", specialties: ["Engineering", "Business", "Medicine"] },
      { name: "University of Otago", worldRanking: 206, city: "Dunedin", specialties: ["Medicine", "Sciences", "Humanities"] },
      { name: "Victoria University of Wellington", worldRanking: 241, city: "Wellington", specialties: ["Law", "Arts", "Sciences"] },
      { name: "University of Canterbury", worldRanking: 256, city: "Christchurch", specialties: ["Engineering", "Sciences", "Arts"] },
      { name: "Massey University", worldRanking: 239, city: "Palmerston North", specialties: ["Agriculture", "Aviation", "Veterinary"] },
    ],
  },
];

const StudyAbroad = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleExploreUniversities = (destination: Destination) => {
    setSelectedDestination(destination);
    setDialogOpen(true);
  };

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
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/5 relative aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.country}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent lg:bg-gradient-to-r" />
                    <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8">
                      <span className="text-5xl mb-2 block">{destination.flag}</span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-background">
                        {destination.country}
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
                          <div className="font-semibold text-foreground">{destination.universities}+</div>
                          <div className="text-xs text-muted-foreground">Universities</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">{destination.avgCost}</div>
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
                          <div className="font-semibold text-foreground">{destination.workHours}</div>
                          <div className="text-xs text-muted-foreground">Part-time Work</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {destination.highlights.map((highlight) => (
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
            ))}
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
        country={selectedDestination?.country || ""}
        flag={selectedDestination?.flag || ""}
        universities={selectedDestination?.topUniversities || []}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Layout>
  );
};

export default StudyAbroad;
