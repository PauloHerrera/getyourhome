import { signInSchema } from "@/schemas/sign-in-schema";
import { actionClient, actionError, actionSuccess } from "../safe-action";
import { createServerClient } from "@/lib/supabase/server";

export const signInAction = actionClient
  .metadata({
    actionName: "sign-in",
  })
  .schema(signInSchema)
  .action(async ({ parsedInput }) => {
    try {
      const supabase = await createServerClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: parsedInput.email,
        password: parsedInput.password,
      });

      if (error) {
        return actionError("Error signing in", error.message);
      }
      console.log("333 data", data);

      if (!data) {
        return actionError("User not found", "User not found");
      }

      return actionSuccess(data);
    } catch (error) {
      console.error("Error signing in", error);
      return actionError("Error signing in", error as string);
    }
  });
