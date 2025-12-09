import { useState, useEffect } from "react";

const useAISuggestion = () => {
  // hook logic: fetching AI suggestions from /api/llm/ai-suggestions
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAISuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/llm/ai-suggestions", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const resJson = await response.body.getReader().read();
        const aiText = new TextDecoder("utf-8").decode(resJson.value);
        setData(aiText);
        // process data as needed
      } catch (err) {
        console.error("Error fetching AI suggestions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAISuggestions();
  }, []);

  return { data, loading, error };
};

export default useAISuggestion;
