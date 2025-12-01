import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useRefresh = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // excluded path name not to redirect to home if user not signed in
  const exclude = ["/login", "/signup"];

  useEffect(() => {
    const navigateRoot = () => {
      if (!exclude.includes(pathname)) navigate("/");
    };
    const refresh = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) {
          navigateRoot();
          return;
        }
        const data = await response.json();
        if (!data.token) {
          navigateRoot();
          return;
        }
        sessionStorage.setItem("token", data.token);
        // navigate("/dashboard");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, []);
  return {
    loading,
    error,
  };
};

export default useRefresh;
