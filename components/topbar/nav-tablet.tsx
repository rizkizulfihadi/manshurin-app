"use client";

import { BookOpen, Home, Lightbulb, Menu, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/components/logo";
import { Separator } from "../ui/separator";
import Link from "next/link";
import ModeToggle from "@/components/topbar/mode-toggle";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavTablet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };
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
  const pathname = usePathname();

  return (
    <div className="block lg:hidden order-1">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>
              <div className="flex gap-x-2 items-center">
                <Logo />
                <span className="font-logo text-2xl text-primary">
                  Manshurin
                </span>
              </div>
              <Separator className="w-full my-5" />
            </SheetTitle>
            <SheetDescription className=""></SheetDescription>
          </SheetHeader>
          <div>
            <ul className="flex flex-col gap-y-2">
              {menu.map((item) => (
                <li key={item.name}>
                  <Button
                    variant={pathname === item.href ? "default" : "outline"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href} onClick={handleClick}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
            <Separator className="my-5" />
            <div className="flex items-center justify-center mt-5">
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavTablet;
