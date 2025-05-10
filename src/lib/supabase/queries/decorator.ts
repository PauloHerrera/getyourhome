import type {
  PostgrestMaybeSingleResponse,
  PostgrestResponse,
  PostgrestSingleResponse,
  UserResponse,
} from "@supabase/supabase-js";

export type SupabaseData<T> = T extends Array<infer U> ? Array<U> : T extends object ? T : T;

export type SupabaseResponse<T> = Promise<{
  data: SupabaseData<T> | null;
  error: string | null;
}>;

export type SupabaseCallback<T> = () => Promise<
  | PostgrestSingleResponse<T | null>
  | PostgrestResponse<T>
  | PostgrestMaybeSingleResponse<T>
  | UserResponse
>;

/**
 * A decorator function to handle Supabase queries and mutations with proper error handling,
 * camelCase transformation, and consistent return types.
 */
export async function withSupabase<T extends object>(
  callback: SupabaseCallback<T>
): Promise<SupabaseResponse<T>> {
  try {
    const result = await callback();

    if (result.error) {
      console.error(`Supabase error: ${result.error.message}`);
      return { data: null, error: result.error.message };
    }

    if (!result.data) {
      return { data: null, error: null };
    }

    if (typeof result.data === "object") {
      // If the data is from a UserResponse
      if ("user" in result.data) {
        return {
          data: result.data.user as SupabaseData<T>,
          error: null,
        };
      }

      // Handle array responses with correct typing
      if (Array.isArray(result.data)) {
        return {
          data: result.data as SupabaseData<T>,
          error: null,
        };
      }

      // Handle single object responses
      return {
        data: result.data as SupabaseData<T>,
        error: null,
      };
    }

    return { data: null, error: null };
  } catch (error) {
    console.error(error);

    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error(`Unexpected Supabase error: ${errorMessage}`);
    return { data: null, error: errorMessage };
  }
}
