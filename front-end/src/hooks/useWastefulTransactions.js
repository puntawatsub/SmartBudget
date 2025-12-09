import { useState, useEffect } from "react";

// Utility to format date as "31 Dec 2020"
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

// Utility to format amount as "-€23.00"
const formatAmount = (amount) => `-€${Math.abs(amount).toFixed(2)}`;

const useWastefulTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/llm/wasteful-transactions", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();

        // Map backend data to desired front-end model
        const mapped = data.map((t) => ({
          date: formatDate(t.date),
          merchant: t.merchant,
          category: t.wastefulAnalysis, // map wastefulAnalysis to category
          amount: formatAmount(t.amount),
        }));

        setTransactions(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};
export default useWastefulTransactions;
