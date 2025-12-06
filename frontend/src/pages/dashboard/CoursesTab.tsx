import { useEffect, useState } from "react";
import api from "@/api/client";
import { Button } from "@/components/ui/button";

type CourseInfo = {
  _id: string;
  title?: string;
  category?: string;
  price?: number;
};

type Enrollment = {
  _id: string;
  status: string;
  paymentStatus?: string;
  course?: CourseInfo | null;
  createdAt?: string;
};

const CoursesTab = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/enrollments/my");
      setEnrollments(res.data.data.enrollments || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleCancel = async (id: string) => {
    await api.delete(`/enrollments/${id}`);
    fetchEnrollments();
  };

  if (loading) {
    return <div className="text-muted-foreground">Loading your courses...</div>;
  }

  if (!enrollments.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <p className="text-foreground font-medium mb-2">No enrollments yet</p>
        <p className="text-muted-foreground text-sm">Enroll in a course to see it appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-xl font-semibold text-foreground">My Courses</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Course</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Payment</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment._id} className="border-t border-border">
                <td className="px-4 py-3 text-foreground">
                  {enrollment.course?.title || "Untitled"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {enrollment.course?.category || "N/A"}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-secondary text-foreground text-xs font-medium">
                    {enrollment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {enrollment.paymentStatus || "N/A"}
                </td>
                <td className="px-4 py-3">
                  {enrollment.status === "PENDING" && (
                    <Button variant="outline" size="sm" onClick={() => handleCancel(enrollment._id)}>
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTab;
