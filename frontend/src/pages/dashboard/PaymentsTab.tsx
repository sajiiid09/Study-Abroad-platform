import { useEffect, useState } from "react";
import api from "@/api/client";

interface Payment {
  _id: string;
  amount?: number;
  method?: string;
  status?: string;
  course?: {
    title?: string;
  } | null;
  createdAt?: string;
}

const PaymentsTab = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/payments/my")
      .then((res) => {
        setPayments(res.data.data.payments || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-muted-foreground">Loading payments...</div>;
  }

  if (!payments.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <p className="text-foreground font-medium mb-2">No payments found yet.</p>
        <p className="text-muted-foreground text-sm">Complete a course payment to see it listed here.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="p-4 border-b border-border">
        <h2 className="font-display text-xl font-semibold text-foreground">Payment History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Course</th>
              <th className="px-4 py-3 text-left font-medium">Amount</th>
              <th className="px-4 py-3 text-left font-medium">Method</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t border-border">
                <td className="px-4 py-3 text-foreground">
                  {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-3 text-foreground">{payment.course?.title || "N/A"}</td>
                <td className="px-4 py-3 text-foreground">${payment.amount?.toFixed(2) || "0.00"}</td>
                <td className="px-4 py-3 text-muted-foreground">{payment.method || "demo"}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-secondary text-foreground text-xs font-medium">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTab;
