import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CircleUser,
  Settings,
  FilePen,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 rounded-full h-10 w-10 cursor-pointer hidden sm:block"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>RZ</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" sideOffset={10}>
        <DropdownMenuLabel className="text-center">
          Rizki Zulfihadi
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
              <DropdownMenuShortcut>
                <LayoutDashboard />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href="/user/profile">
            <DropdownMenuItem className="cursor-pointer">
              Profile
              <DropdownMenuShortcut>
                <CircleUser />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/user/settings">
            <DropdownMenuItem className="cursor-pointer">
              Settings
              <DropdownMenuShortcut>
                <Settings />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/user/post">
            <DropdownMenuItem className="cursor-pointer">
              Posts
              <DropdownMenuShortcut>
                <FilePen />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/user/logout">
          <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-500!">
            Log out
            <DropdownMenuShortcut>
              <LogOut className="text-red-500" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
