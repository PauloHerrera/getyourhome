"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return { data: null, error: "User not found" };
  }

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !userData) {
    console.error(error);
    return { data: null, error: error?.message || "User not found" };
  }

  return userData;
}
