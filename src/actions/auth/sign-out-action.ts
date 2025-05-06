"use server";

import { paths } from "@/config/paths";
import { createClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.auth.signOut();

  revalidateTag(`user_${user?.id}`);

  return redirect(paths.auth.signIn.getHref());
}
