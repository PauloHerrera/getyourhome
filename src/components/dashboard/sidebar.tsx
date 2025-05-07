"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getNavItems } from "@/config/sidebar";
import { Menu, X, LogOut } from "lucide-react";
import { signOutAction } from "@/actions/auth/sign-out-action";

interface SidebarProps {
  role: "admin" | "broker" | "lead" | null;
}

export function Sidebar({ role }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const links = getNavItems(role || "");

  return (
    <>
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="border-primary text-primary"
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "border-background-alt fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-white transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="border-background-alt bg-dark flex h-16 items-center justify-center border-b">
            <h1 className="text-xl font-bold text-white">Leads Brokers</h1>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={cn(
                      "flex items-center rounded-md px-4 py-2 text-sm",
                      isActive
                        ? "bg-primary font-medium text-white"
                        : "text-dark hover:bg-background-alt hover:text-primary"
                    )}
                  >
                    <link.icon
                      className={cn("mr-3 size-5", isActive ? "text-white" : "text-primary")}
                    />
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="border-background-alt border-t p-4">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 flex w-full items-center justify-center"
              type="button"
              onClick={signOutAction}
            >
              <LogOut className="mr-2 size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
