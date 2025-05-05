"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = createServerClient();

  const {
    data: { user: auth },
    error: authError,
  } = await supabase.auth.getUser();

  if (!auth?.id || authError) {
    return { data: null, error: authError?.message || "User not found" };
  }

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", auth.id)
    .single();

  if (error || !userData) {
    console.error(error);
    return { data: null, error: error?.message || "User not found" };
  }

  return userData;
}
