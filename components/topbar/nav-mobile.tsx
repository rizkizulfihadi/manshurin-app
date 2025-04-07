"use client";

import {
  AlignLeft,
  BookOpen,
  Home,
  Lightbulb,
  Newspaper,
  LogIn,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ModeToggle from "./mode-toggle";

export default function NavMobile() {
  const pathname = usePathname();
  const menu = [
    {
      name: "Home",
      href: "/",
      icon: <Home />,
    },
    {
      name: "Artikel",
      href: "/artikel",
      icon: <Newspaper />,
    },
    {
      name: "Nasihat",
      href: "/nasihat",
      icon: <Lightbulb />,
    },
    {
      name: "Doa Doa",
      href: "/doa",
      icon: <BookOpen />,
    },
  ];
  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignLeft className="cursor-pointer p-1.5 size-9 rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50" />
        </SheetTrigger>
        <SheetContent className="w-[300px]" side="left">
          <SheetHeader>
            <SheetTitle className="px-2 mt-2">
              <div className="flex gap-x-2 items-center sm:justify-center">
                <Logo />
                <span className="font-logo text-2xl font-display sm:hidden">
                  Manshurin
                </span>
              </div>
              <div className="my-5 w-full h-px bg-slate-300" />
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <div className="px-2">
              <ul className="flex flex-col gap-y-2">
                {menu.map((item) => (
                  <li key={item.name}>
                    <Button
                      variant={pathname === item.href ? "default" : "outline"}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={item.href}>
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </Button>
                  </li>
                ))}
                <Link
                  href="/auth/login"
                  className="w-full py-2 bg-blue-800 text-center text-white rounded-sm text-sm font-semibold mt-4 hover:bg-blue-800/90 flex items-center justify-center gap-x-1 sm:hidden"
                >
                  <span>Login</span>
                  <LogIn className="size-4" />
                </Link>
              </ul>
              <div className="w-full my-4 flex justify-center">
                <ModeToggle />
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
