import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "@/api/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Course {
  _id: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
}

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "bkash">("stripe");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!courseId) {
      navigate("/courses");
      return;
    }

    const init = async () => {
      setLoading(true);
      try {
        const courseRes = await api.get(`/courses/${courseId}`);
        setCourse(courseRes.data.data.course);

        const enrollRes = await api.post("/enrollments", { courseId });
        setEnrollmentId(enrollRes.data.data.enrollment._id);
      } catch (error) {
        console.error(error);
        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [courseId, navigate]);

  const handlePayNow = async () => {
    if (!enrollmentId) return;
    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const transactionId = `DEMO-${Date.now()}`;
      await api.post(`/enrollments/${enrollmentId}/confirm-payment`, {
        paymentMethod: paymentMethod === "stripe" ? "stripe-demo" : "bkash-demo",
        transactionId,
      });

      alert("Payment successful! Redirecting to your courses...");
      navigate("/dashboard/courses");
    } catch (error) {
      console.error(error);
      alert("Payment failed (demo). Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Complete Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading && <p className="text-muted-foreground">Preparing payment...</p>}

            {!loading && course && (
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">Course</p>
                  <h2 className="text-xl font-semibold text-foreground">{course.title}</h2>
                  <p className="text-muted-foreground text-sm">{course.category}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">${course.price}</p>
                </div>

                <div>
                  <p className="font-medium text-foreground mb-3">Choose payment method</p>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(val: "stripe" | "bkash") => setPaymentMethod(val)}
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    <Label
                      htmlFor="stripe"
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                        paymentMethod === "stripe" ? "border-primary" : "border-border"
                      }`}
                    >
                      <RadioGroupItem id="stripe" value="stripe" />
                      <div>
                        <p className="font-semibold">Stripe Sandbox</p>
                        <p className="text-sm text-muted-foreground">Use demo flow to simulate card payment.</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="bkash"
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                        paymentMethod === "bkash" ? "border-primary" : "border-border"
                      }`}
                    >
                      <RadioGroupItem id="bkash" value="bkash" />
                      <div>
                        <p className="font-semibold">bKash Sandbox</p>
                        <p className="text-sm text-muted-foreground">Simulated mobile wallet checkout.</p>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayNow}
                  disabled={submitting || !enrollmentId}
                >
                  {submitting ? "Processing..." : "Pay Now (Demo)"}
                </Button>
              </div>
            )}

            {!loading && !course && (
              <div className="text-center text-muted-foreground">
                <p>Unable to load course. Please return to the courses page.</p>
                <Button variant="link" onClick={() => navigate("/courses")}>Back to Courses</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentPage;
