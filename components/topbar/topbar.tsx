"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Logo from "@/components/logo";
import NavDesktop from "@/components/topbar/nav-desktop";
import NavTablet from "@/components/topbar/nav-tablet";
import { authRoutes } from "@/routes";

const Topbar = () => {
  const pathname = usePathname();

  const hiddenPaths = authRoutes;

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="sticky top-0 w-full border-b z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
        <Link
          href="/"
          className="flex items-center lg:gap-x-2 order-2 lg:order-1 "
        >
          <Logo />
          <span className="font-logo text-3xl hidden lg:flex">Manshurin</span>
        </Link>
        <NavDesktop />
        <NavTablet />

        <Button
          variant="ghost"
          className="rounded-full order-3 lg:hidden"
          size="icon"
        >
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
