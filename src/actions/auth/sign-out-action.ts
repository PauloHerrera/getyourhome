"use server";

import { paths } from "@/config/paths";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut({
    scope: "local",
  });

  return redirect(paths.auth.signIn.getHref());
}
