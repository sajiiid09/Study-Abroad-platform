import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  FileText,
  CreditCard,
  User,
  Settings,
  LogOut,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const applications = [
  {
    id: 1,
    university: "Oxford University",
    program: "MBA",
    country: "United Kingdom",
    status: "approved",
    date: "2024-01-15",
    progress: 100,
  },
  {
    id: 2,
    university: "MIT",
    program: "Computer Science",
    country: "United States",
    status: "pending",
    date: "2024-02-20",
    progress: 60,
  },
  {
    id: 3,
    university: "University of Toronto",
    program: "Data Science",
    country: "Canada",
    status: "review",
    date: "2024-03-01",
    progress: 40,
  },
];

const courses = [
  {
    id: 1,
    title: "IELTS Preparation",
    progress: 75,
    nextLesson: "Speaking Practice",
    dueDate: "Dec 10, 2024",
  },
  {
    id: 2,
    title: "GRE Mastery",
    progress: 45,
    nextLesson: "Quantitative Section",
    dueDate: "Dec 15, 2024",
  },
];

const statusConfig = {
  approved: { label: "Approved", icon: CheckCircle, color: "text-success bg-success/10" },
  pending: { label: "Pending", icon: Clock, color: "text-warning bg-warning/10" },
  review: { label: "Under Review", icon: AlertCircle, color: "text-primary bg-primary/10" },
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  };

  const sidebarLinks = [
    { icon: BookOpen, label: "My Applications", active: true },
    { icon: GraduationCap, label: "My Courses" },
    { icon: FileText, label: "Documents" },
    { icon: CreditCard, label: "Payments" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Global<span className="text-primary">Study</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  link.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </button>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="w-full">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-display text-xl font-semibold text-foreground">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-border"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 space-y-8">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-hero rounded-2xl p-6 lg:p-8"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">
              Welcome back, {user.name.split(" ")[0]}! 👋
            </h2>
            <p className="text-primary-foreground/80 mb-4">
              Track your applications, continue your courses, and manage your study abroad journey.
            </p>
            <Link to="/courses">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Browse More Courses
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Applications", value: "3", icon: FileText, color: "bg-primary/10 text-primary" },
              { label: "Active Courses", value: "2", icon: BookOpen, color: "bg-accent/10 text-accent" },
              { label: "Documents", value: "12", icon: FileText, color: "bg-success/10 text-success" },
              { label: "Pending Tasks", value: "5", icon: Clock, color: "bg-warning/10 text-warning" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl p-4 border border-border/50"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  My Applications
                </h3>
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="divide-y divide-border">
                {applications.map((app) => {
                  const status = statusConfig[app.status as keyof typeof statusConfig];
                  return (
                    <div key={app.id} className="p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{app.university}</h4>
                          <p className="text-sm text-muted-foreground">
                            {app.program} • {app.country}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <status.icon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${app.progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  My Courses
                </h3>
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="divide-y divide-border">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Next: {course.nextLesson}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-primary">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mb-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Due: {course.dueDate}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Link to="/online-courses">
                  <Button variant="outline" className="w-full">
                    Explore More Courses
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
