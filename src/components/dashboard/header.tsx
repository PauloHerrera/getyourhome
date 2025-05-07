"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, UserIcon } from "lucide-react";
import { signOutAction } from "@/actions/auth/sign-out-action";

interface HeaderProps {
  user: {
    name: string;
    last_name: string;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
      <div className="hidden md:block md:w-64" />
      <div className="flex flex-1 items-center justify-end gap-4 md:gap-2 lg:gap-4">
        <Button
          variant="outline"
          size="icon"
          className="border-primary text-primary hover:bg-primary/10 rounded-full"
        >
          <Bell className="size-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary hover:bg-primary/10 rounded-full"
            >
              <UserIcon className="size-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-background-alt">
            <DropdownMenuLabel className="text-dark">
              {user ? `${user.name} ${user.last_name}` : "Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-background-alt" />
            <DropdownMenuItem
              asChild
              className="text-dark hover:text-primary hover:bg-background-alt"
            >
              <a href="/dashboard/profile">Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-dark hover:text-primary hover:bg-background-alt"
            >
              <a href="/dashboard/settings">Settings</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-background-alt" />
            <DropdownMenuItem
              asChild
              className="text-dark hover:text-primary hover:bg-background-alt"
            >
              <button type="button" onClick={signOutAction} className="w-full text-left">
                Sign out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
