import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Play, Clock, Users, Star, CheckCircle, Globe } from "lucide-react";
import { OnlineCourseDialog } from "@/components/courses/OnlineCourseDialog";

interface OnlineCourse {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  price: number;
  originalPrice: number;
  image: string;
  features: string[];
}

const onlineCourses: OnlineCourse[] = [
  {
    id: 1,
    title: "Complete IELTS Online Masterclass",
    instructor: "Dr. Sarah Williams",
    duration: "40 hours",
    lessons: 85,
    students: 12500,
    rating: 4.9,
    price: 149,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    features: ["Lifetime access", "Certificate", "24/7 support", "Mobile access"],
  },
  {
    id: 2,
    title: "GRE Verbal & Quantitative",
    instructor: "Prof. Michael Chen",
    duration: "60 hours",
    lessons: 120,
    students: 8900,
    rating: 4.8,
    price: 199,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    features: ["Practice tests", "Video lessons", "Study materials", "Expert Q&A"],
  },
  {
    id: 3,
    title: "Academic English for University",
    instructor: "Emma Thompson",
    duration: "25 hours",
    lessons: 50,
    students: 6700,
    rating: 4.7,
    price: 99,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80",
    features: ["Writing workshops", "Speaking practice", "Peer review", "Portfolio"],
  },
  {
    id: 4,
    title: "University Application Secrets",
    instructor: "James Anderson",
    duration: "15 hours",
    lessons: 35,
    students: 4500,
    rating: 4.9,
    price: 79,
    originalPrice: 159,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    features: ["SOP templates", "Essay reviews", "Interview prep", "Case studies"],
  },
];

const OnlineCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<OnlineCourse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleStartLearning = (course: OnlineCourse) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-accent text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Learn From Anywhere
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Online <span className="text-accent">Learning</span> Platform
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Access world-class education from the comfort of your home. Learn at your own pace with our comprehensive online courses.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { label: "Courses", value: "50+" },
                { label: "Students", value: "30K+" },
                { label: "Instructors", value: "25+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Online Courses
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our most popular courses with proven results and thousands of success stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {onlineCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col md:flex-row"
              >
                <div className="relative md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                      <Play className="w-6 h-6 text-accent-foreground fill-accent-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                      BESTSELLER
                    </span>
                  </div>
                </div>
                <div className="md:w-3/5 p-6 flex flex-col">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    By {course.instructor}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span>{course.rating} ({course.students.toLocaleString()})</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {course.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-bold text-foreground">
                        ${course.price}
                      </span>
                      <span className="text-muted-foreground line-through text-sm">
                        ${course.originalPrice}
                      </span>
                    </div>
                    <Button onClick={() => handleStartLearning(course)}>Start Learning</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Learn Anywhere", desc: "Access courses from any device, anywhere in the world." },
              { icon: Clock, title: "Self-Paced", desc: "Learn at your own pace with lifetime access to content." },
              { icon: Users, title: "Expert Support", desc: "Get help from instructors and connect with peers." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OnlineCourseDialog
        course={selectedCourse}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Layout>
  );
};

export default OnlineCourses;
