import Link from "next/link";
import GlobalSearch from "./global-search";
import { LogIn } from "lucide-react";
import UserProfile from "./user-profile";

export default function UserControls() {
  const isLoggedIn = false;
  return (
    <div className="flex lg:hidden order-3 md:order-3 gap-x-4 items-center">
      <GlobalSearch />
      {isLoggedIn ? (
        <UserProfile />
      ) : (
        <Link
          href="/auth/login"
          className="p-2 bg-blue-700 text-center text-white rounded-sm text-sm font-semibold hover:bg-blue-700/90 items-center justify-center gap-x-1 hidden sm:block"
        >
          <LogIn className="size-5" />
        </Link>
      )}
    </div>
  );
}
