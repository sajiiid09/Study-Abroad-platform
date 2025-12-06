import { useEffect, useState } from "react";
import api from "@/api/client";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, CreditCard, LayoutDashboard } from "lucide-react";

const OverviewTab = () => {
  const { user } = useAuth();
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);

  useEffect(() => {
    Promise.all([api.get("/enrollments/my"), api.get("/payments/my")])
      .then(([enrollmentRes, paymentsRes]) => {
        const enrollments = enrollmentRes.data?.data?.enrollments || [];
        const payments = paymentsRes.data?.data?.payments || [];
        setEnrollmentsCount(enrollments.length);
        setActiveCourses(enrollments.filter((item: any) => item.status === "ACTIVE").length);
        setPaymentsCount(payments.length);
      })
      .catch(() => {
        setEnrollmentsCount(0);
        setActiveCourses(0);
        setPaymentsCount(0);
      });
  }, []);

  const cards = [
    {
      label: "Total Enrollments",
      value: enrollmentsCount,
      icon: LayoutDashboard,
    },
    {
      label: "Active Courses",
      value: activeCourses,
      icon: BookOpen,
    },
    {
      label: "Payments",
      value: paymentsCount,
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Welcome back, {user?.name || "student"}!
        </h2>
        <p className="text-muted-foreground">
          Keep track of your study journey, enrollments, and payments from this dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <card.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-semibold text-foreground">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTab;
