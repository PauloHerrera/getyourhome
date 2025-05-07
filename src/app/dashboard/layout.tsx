import type React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role as "admin" | "broker" | "lead"} />
      <div className="flex flex-1 flex-col">
        <Header user={user} />
        <main className="flex-1 bg-gray-50 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
