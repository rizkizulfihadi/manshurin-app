import Link from "next/link";
import { Logo } from "@/components/logo";
import NavigationMenu from "./navigation-menu";
import UserControls from "./user-controls";

export default function Topbar() {
  return (
    <header className="sticky top-0 w-full z-50 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 border-b">
      <div className="mx-auto px-2 md:px-4 xl:px-6 2xl:max-w-[1500px] h-14 flex items-center justify-between">
        <Link
          href="/"
          className="order-2 lg:order-1 flex items-center gap-x-2 scale-90"
        >
          <Logo />
          <span className="hidden sm:block text-3xl font-display ">
            Manshurin
          </span>
        </Link>
        <NavigationMenu />
        <UserControls />
      </div>
    </header>
  );
}
