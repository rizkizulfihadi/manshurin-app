"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunMedium, MonitorCog } from "lucide-react";

const ModeToggle = () => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (theme: string) => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.remove("light", "dark", "system");

    if (theme === "system") {
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="relative inline-flex items-center gap-x-1 rounded-full border bg-muted/50 p-1 scale-90">
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full hover:bg-blue-700 hover:text-white ${
          theme === "dark" ? "bg-blue-600 text-white" : ""
        }`}
        onClick={() => toggleTheme("dark")}
      >
        <MoonIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full hover:bg-blue-700 hover:text-white ${
          theme === "light" ? "bg-blue-600 text-white" : ""
        }`}
        onClick={() => toggleTheme("light")}
      >
        <SunMedium />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full hover:bg-blue-700 hover:text-white ${
          theme === "system" ? "bg-blue-600 text-white" : ""
        }`}
        onClick={() => toggleTheme("system")}
      >
        <MonitorCog />
      </Button>
    </div>
  );
};

export default ModeToggle;
