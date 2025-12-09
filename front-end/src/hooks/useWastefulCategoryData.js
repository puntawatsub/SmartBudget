import React, { useEffect, useState } from "react";

const COLORS = ["#274754", "#2A9D90", "#E76E50", "#E8C468"]; // rotating colors

const useWastefulCategoryData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/llm/cat-percent`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const backendData = await response.json();

        // Map backend data to desired frontend model
        const mappedData = backendData.map((item, index) => ({
          category: item.category || "Uncategorized",
          percentage: Number(item.percentage.toFixed(2)), // round to 2 decimals
          fill: COLORS[index % COLORS.length], // rotate colors
        }));

        setData(mappedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching wasteful category data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};

export default useWastefulCategoryData;
