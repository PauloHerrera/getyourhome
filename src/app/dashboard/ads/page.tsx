import AdsForm from "@/components/dashboard/ads/ads-form";
import { paths } from "@/config/paths";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(paths.auth.signIn.getHref());
  }

  //LEADS
  if (user.role !== "broker") {
    redirect(paths.dashboard.getHref());
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Create New Property Request</h1>
      <AdsForm />
    </div>
  );
}
