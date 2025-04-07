"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import ModeToggle from "./mode-toggle";
import GlobalSearch from "./global-search";
import ButtonAuth from "./button-auth";
import UserProfile from "./user-profile";

export default function NavDesktop() {
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
  const isLoggedIn = true;
  return (
    <div className="hidden lg:flex gap-x-4 items-center ">
      <ul className="flex gap-x-4">
        {menu.map((item) => (
          <Button
            key={item.name}
            variant={item.href === pathname ? "default" : "ghost"}
            asChild
            className="rounded-full text-md"
          >
            <Link href={item.href} className="font-semibold">
              {item.name}
            </Link>
          </Button>
        ))}
      </ul>
      <div className="h-6 w-[1px] bg-gray-300/60 rounded-2xl" />
      <ModeToggle />
      <GlobalSearch />
      {isLoggedIn ? <UserProfile /> : <ButtonAuth />}
    </div>
  );
}
