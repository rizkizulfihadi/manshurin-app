"use client";

import {
  LayoutDashboard,
  SquarePen,
  UserPen,
  BellRing,
  LockKeyholeOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuDashboard = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    name: "Post",
    href: "/dashboard/post",
    icon: <SquarePen className="size-4" />,
  },
  {
    name: "Notifikasi",
    href: "/dashboard/notification",
    icon: <BellRing className="size-4" />,
  },
];

const menuSettings = [
  {
    name: "Sunting Profile",
    href: "/settings/change-user",
    icon: <UserPen className="size-4" />,
  },
  {
    name: "Ganti Kata Sandi",
    href: "/settings/change-password",
    icon: <LockKeyholeOpen className="size-4" />,
  },
];

const menu = [...menuDashboard, ...menuSettings];

export function SidebarDesktop() {
  const pathname = usePathname();

  return (
    <aside className="border-r lg:fixed lg:h-screen lg:w-54 pt-4 hidden lg:block">
      <h1 className=" ml-2 text-gray-700 dark:text-slate-200">Dashboard</h1>
      <div className="my-3 w-[80%] border-t" />
      <ul>
        {menuDashboard.map((item) => (
          <Link key={item.name} href={item.href}>
            <li
              className={`inline-flex items-center gap-x-2  w-full px-4 py-4 text-[15px] text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
                pathname == item.href &&
                "border-r-2 border-slate-700 dark:border-slate-100 text-slate-900 dark:text-white bg-muted/40 rounded-l-sm"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>

      <h1 className="ml-2 text-gray-700 dark:text-slate-200 pt-8">Settings</h1>
      <div className="my-3 w-[80%] border-t" />
      <ul>
        {menuSettings.map((item) => (
          <Link key={item.name} href={item.href}>
            <li
              className={`inline-flex items-center gap-x-2  w-full px-4 py-4 text-[15px] text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
                pathname == item.href &&
                "border-r-2 border-slate-700 dark:border-slate-100 text-slate-900 dark:text-white bg-muted/40 rounded-l-sm"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}

export function SidebarTablet() {
  const pathname = usePathname();
  return (
    <nav className="px-6 border-b hidden sm:block lg:hidden absolute left-0 right-0 overflow-x-auto">
      <ul className="flex gap-3">
        {menu.map((item) => (
          <li
            className={`py-1.5 text-sm ${
              pathname == item.href &&
              "border-b-[2.5px] border-slate-800 dark:border-white "
            }`}
            key={item.name}
          >
            <Link
              href={item.href}
              className="flex items-center gap-x-1.5 hover:bg-muted/80 px-3 rounded-sm py-1 text-[15px]"
            >
              {/* {item.icon} */}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
