"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunMedium, MonitorCog } from "lucide-react";

export default function ModeToggle() {
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

    root.classList.remove("light", "dark");

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
    <div className="inline-flex items-center gap-x-1 rounded-full border bg-muted/50 p-1 scale-85">
      <Button
        size="icon"
        className={`cursor-pointer rounded-full hover:bg-blue-600 hover:text-white ${
          theme === "dark" && "bg-blue-600! text-white!"
        }`}
        variant="outline"
        onClick={() => toggleTheme("dark")}
      >
        <MoonIcon />
      </Button>
      <Button
        size="icon"
        className={`cursor-pointer rounded-full hover:bg-blue-600 hover:text-white ${
          theme === "light" && "bg-blue-600! text-white!"
        }`}
        variant="outline"
        onClick={() => toggleTheme("light")}
      >
        <SunMedium />
      </Button>
      <Button
        size="icon"
        className={`cursor-pointer rounded-full hover:bg-blue-600 hover:text-white ${
          theme === "system" && "bg-blue-600! text-white!"
        }`}
        variant="outline"
        onClick={() => toggleTheme("system")}
      >
        <MonitorCog />
      </Button>
    </div>
  );
}
