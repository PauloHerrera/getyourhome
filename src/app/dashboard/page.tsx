import { getCurrentUser } from "@/lib/auth";
import { paths } from "@/config/paths";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(paths.auth.signIn.getHref());
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard for: {user.role}</h1>
    </div>
  );
}
