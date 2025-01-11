import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("amsTheme") || "light";
    setTheme(storedTheme);

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("amsTheme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="h-6 w-6 rounded-full bg-slate-950 p-1 focus-visible:outline-none dark:bg-slate-400"
    >
      {theme === "light" ? (
        <Icon icon="twemoji:sun" className="h-full w-full" />
      ) : (
        <Icon icon="openmoji:crescent-moon" className="h-full w-full" />
      )}
    </button>
  );
}

export default ThemeToggle;
