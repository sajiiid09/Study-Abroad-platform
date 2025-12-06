import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import OnlineCourses from "./pages/OnlineCourses";
import StudyAbroad from "./pages/StudyAbroad";
import Success from "./pages/Success";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import PaymentPage from "./pages/PaymentPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import OverviewTab from "./pages/dashboard/OverviewTab";
import CoursesTab from "./pages/dashboard/CoursesTab";
import PaymentsTab from "./pages/dashboard/PaymentsTab";
import DocumentsTab from "./pages/dashboard/DocumentsTab";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/online-courses" element={<OnlineCourses />} />
          <Route path="/study-abroad" element={<StudyAbroad />} />
          <Route path="/success" element={<Success />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<OverviewTab />} />
            <Route path="courses" element={<CoursesTab />} />
            <Route path="payments" element={<PaymentsTab />} />
            <Route path="documents" element={<DocumentsTab />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
