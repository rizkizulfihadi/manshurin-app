"use client";

import ModeToggle from "@/components/topbar/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavDesktop = () => {
  const menu = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Artikel",
      href: "/artikel",
    },
    {
      name: "Nasihat",
      href: "/nasihat",
    },
    {
      name: "Doa Doa",
      href: "/doa",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="items-center gap-x-4 hidden lg:flex lg:order-2">
      <ul className="flex gap-x-4 text-sm font-semibold">
        {menu.map((item) => (
          <Button
            key={item.name}
            variant={item.href === pathname ? "default" : "ghost"}
            asChild
            className="rounded-full"
          >
            <Link href={item.href}>{item.name}</Link>
          </Button>
        ))}
      </ul>
      <Separator orientation="vertical" className="h-6" />
      <ModeToggle />
      <Button variant="ghost" className="rounded-full" size="icon">
        <Search />
      </Button>
      <div className="flex gap-x-2">
        <Button variant="default" asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/register">Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default NavDesktop;
