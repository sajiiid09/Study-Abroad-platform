import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Users, Star, CheckCircle, BookOpen, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

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

interface OnlineCourseDialogProps {
  course: OnlineCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const enrollmentSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
});

export const OnlineCourseDialog = ({ course, open, onOpenChange }: OnlineCourseDialogProps) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleApplyClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = enrollmentSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Enrollment Submitted!",
      description: `Your application for ${course?.title} has been received. We'll contact you soon.`,
    });
    
    setIsSubmitting(false);
    setShowForm(false);
    setFormData({ fullName: "", email: "", phone: "" });
    onOpenChange(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setShowForm(false);
      setFormData({ fullName: "", email: "", phone: "" });
      setErrors({});
    }
    onOpenChange(open);
  };

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{course.title}</DialogTitle>
        </DialogHeader>

        {!showForm ? (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
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

            <div>
              <p className="text-muted-foreground">By <span className="text-foreground font-medium">{course.instructor}</span></p>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span>{course.rating}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">What's Included</h3>
              <div className="grid grid-cols-2 gap-2">
                {course.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Course Highlights</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Self-paced learning with lifetime access</li>
                <li>• Downloadable resources and materials</li>
                <li>• Certificate of completion</li>
                <li>• Direct access to instructor Q&A</li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-sm text-muted-foreground">Course Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-foreground">
                    ${course.price}
                  </span>
                  <span className="text-muted-foreground line-through">
                    ${course.originalPrice}
                  </span>
                </div>
              </div>
              <Button size="lg" onClick={handleApplyClick}>
                Apply Now
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{course.title}</p>
                  <p className="text-sm text-muted-foreground">Course Fee: ${course.price}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowForm(false)}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Enrollment"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
