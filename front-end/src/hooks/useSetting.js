import { useState } from "react";

export function useSetting() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("eur");
  const [region, setRegion] = useState("fi");
  const [avatar, setAvatar] = useState(null);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
 
  const url = "http://localhost:3000/api/settings";

  // Load settings 
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          }
        });
        if (!res.ok) throw new Error("Failed to fetch settings");

        const data = await res.json();
        setTitle(data.name || "");
        setEmail(data.email || "");
        setTheme(data.theme || "Light");
        setLanguage(data.language || "English");
        setCurrency(data.currency || "USD");
        setRegion(data.region || "USA");
      } catch (err) {
        console.error(err);
      }
    };

    fetchSettings();
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove("Light", "Dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Save settings to backend
  const saveSettings = async () => {
    try {
      // Save personal info
      const personalRes = await fetch(`${url}/personal`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ name: title, email }),
      });
      if (!personalRes.ok) {
        const err = await personalRes.json();
        throw new Error(err.message || "Failed to save personal info");
      }

      // Save app settings
      const appRes = await fetch(`${BACKEND_URL}/app`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ theme, language, currency, region }),
      });
      if (!appRes.ok) {
        const err = await appRes.json();
        throw new Error(err.message || "Failed to save app settings");
      }

      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  const reset = () => {
    setTitle("");
    setEmail("");
    setCurrency("USD");
    setRegion("USA");
    setAvatar(null);
    setTheme("Light");
    setLanguage("English");
    setNotifications(false);
  };

  return {
    title, 
    setTitle,
    email, 
    setEmail,
    currency, 
    setCurrency,
    region, 
    setRegion,
    avatar, 
    setAvatar,
    theme, 
    setTheme,
    language,
    setLanguage,
    reset,
    saveSettings
  };
}
