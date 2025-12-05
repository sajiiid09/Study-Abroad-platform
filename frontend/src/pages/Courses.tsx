import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, BookOpen, Filter, Search } from "lucide-react";
import { EnrollmentDialog } from "@/components/courses/EnrollmentDialog";

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  description: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "IELTS Preparation Course",
    category: "Language",
    duration: "8 weeks",
    students: 2500,
    rating: 4.9,
    price: 299,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    description: "Comprehensive IELTS preparation with expert instructors and practice tests.",
  },
  {
    id: 2,
    title: "TOEFL Mastery Program",
    category: "Language",
    duration: "10 weeks",
    students: 1800,
    rating: 4.8,
    price: 349,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    description: "Master all sections of TOEFL with proven strategies and techniques.",
  },
  {
    id: 3,
    title: "GRE Complete Prep",
    category: "Test Prep",
    duration: "12 weeks",
    students: 1200,
    rating: 4.7,
    price: 449,
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
    description: "Intensive GRE preparation covering Verbal, Quantitative, and Analytical Writing.",
  },
  {
    id: 4,
    title: "SAT Prep Bootcamp",
    category: "Test Prep",
    duration: "6 weeks",
    students: 3200,
    rating: 4.9,
    price: 279,
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    description: "Fast-track SAT preparation with score improvement guarantee.",
  },
  {
    id: 5,
    title: "Academic Writing Skills",
    category: "Academic",
    duration: "4 weeks",
    students: 950,
    rating: 4.6,
    price: 199,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    description: "Develop essential academic writing skills for university success.",
  },
  {
    id: 6,
    title: "Study Abroad Counseling",
    category: "Counseling",
    duration: "Personalized",
    students: 5000,
    rating: 5.0,
    price: 599,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    description: "One-on-one counseling sessions with expert advisors.",
  },
];

const categories = ["All", "Language", "Test Prep", "Academic", "Counseling"];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Explore Our <span className="text-accent">Courses</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Comprehensive programs designed to prepare you for academic success abroad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-card sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-display text-2xl font-bold text-foreground">
                      ${course.price}
                    </span>
                    <Button size="sm" onClick={() => handleEnrollClick(course)}>
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EnrollmentDialog
        course={selectedCourse}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Layout>
  );
};

export default Courses;
