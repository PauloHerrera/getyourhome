import { createServerClient } from "@/lib/supabase/server";
import { actionClient, actionError } from "../safe-action";
import { appConfig } from "@/config/env";
import { paths } from "@/config/paths";
import { redirect } from "next/navigation";
import { signUpSchema } from "@/schemas/sign-up-schema";

export const signUpAction = actionClient
  .metadata({
    actionName: "sign-up",
  })
  .schema(signUpSchema)
  .action(async ({ parsedInput }) => {
    try {
      const supabase = await createServerClient();
      const { error } = await supabase.auth.signUp({
        email: parsedInput.email,
        password: parsedInput.password,
        phone: parsedInput.phone,
        options: {
          emailRedirectTo: paths.auth.callback.getHref(appConfig.url),
          data: {
            display_name: parsedInput.displayName,
            marketing_opt_in: parsedInput.marketingOptIn,
            terms_accepted: parsedInput.termsAccepted,
          },
        },
      });

      if (error) {
        return actionError("Erro ao criar usuário", error.message);
      }
    } catch (error) {
      return actionError("Erro inesperado. Tente novamente mais tarde.", error as string);
    }

    redirect(paths.auth.verify.getHref(parsedInput.email));
  });
