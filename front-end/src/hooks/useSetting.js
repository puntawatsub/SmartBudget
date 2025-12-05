import { useState, useEffect } from "react";

export function useSetting() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("eur");
  const [region, setRegion] = useState("fi");
  const [avatar, setAvatar] = useState(null);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
 
  useEffect(() => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  }, [theme]);


  const reset = () => {
    setTitle("");
    setEmail("");
    setCurrency("eur");
    setRegion("fi");
    setAvatar(null);
    setTheme("light");
    setLanguage("en");
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
  };
}
