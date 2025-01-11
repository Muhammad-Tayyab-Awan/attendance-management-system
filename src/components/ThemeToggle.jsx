import { Button } from "flowbite-react";
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
    <Button size="xs" onClick={toggleTheme} className="w-fit">
      {theme === "light" ? (
        <Icon icon="mingcute:sun-fill" fontSize="15px" />
      ) : (
        <Icon icon="openmoji:crescent-moon" fontSize="15px" />
      )}
    </Button>
  );
}

export default ThemeToggle;
