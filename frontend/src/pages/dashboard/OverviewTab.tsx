import { useEffect, useState } from "react";
import api from "@/api/client";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  CalendarClock,
  Clock3,
  FileText,
  LayoutDashboard,
} from "lucide-react";

type OverviewStats = {
  totalEnrollments: number;
  activeEnrollments: number;
  totalApplications: number;
  pendingApplications: number;
  upcomingConsultations: number;
};

const initialStats: OverviewStats = {
  totalEnrollments: 0,
  activeEnrollments: 0,
  totalApplications: 0,
  pendingApplications: 0,
  upcomingConsultations: 0,
};

const OverviewTab = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<OverviewStats>(initialStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const response = await api.get("/dashboard/overview");
        const apiStats = response.data?.data?.stats || {};
        setStats({
          totalEnrollments: apiStats.totalEnrollments ?? 0,
          activeEnrollments: apiStats.activeEnrollments ?? 0,
          totalApplications: apiStats.totalApplications ?? 0,
          pendingApplications: apiStats.pendingApplications ?? 0,
          upcomingConsultations: apiStats.upcomingConsultations ?? 0,
        });
      } catch (error) {
        console.error("Failed to load overview stats", error);
        setStats(initialStats);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      label: "Total Enrollments",
      value: stats.totalEnrollments,
      icon: LayoutDashboard,
    },
    {
      label: "Active Courses",
      value: stats.activeEnrollments,
      icon: BookOpen,
    },
    {
      label: "Applications",
      value: stats.totalApplications,
      icon: FileText,
    },
    {
      label: "Pending Applications",
      value: stats.pendingApplications,
      icon: Clock3,
    },
    {
      label: "Upcoming Consultations",
      value: stats.upcomingConsultations,
      icon: CalendarClock,
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <card.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-semibold text-foreground">
                {loading ? "..." : card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTab;
