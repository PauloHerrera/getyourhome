import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseResponse, withSupabase } from "./decorator";
import { PropertyType } from "../types/db.types";

export async function listPropertyTypes(
  supabase: SupabaseClient
): Promise<SupabaseResponse<PropertyType[]>> {
  return withSupabase(async () => {
    const response = await supabase
      .from("property_types")
      .select("*")
      .order("name", { ascending: true });

    return response;
  });
}
