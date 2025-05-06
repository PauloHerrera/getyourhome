"use server";

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

      const { data: userData, error } = await supabase.auth.signUp({
        email: parsedInput.email,
        phone: parsedInput.phone,
        password: parsedInput.password,
        options: {
          emailRedirectTo: paths.auth.callback.getHref(appConfig.url),
          data: {
            name: parsedInput.name,
            last_name: parsedInput.lastName,
            role: parsedInput.role || "lead",
            terms_accepted: parsedInput.termsAccepted,
          },
        },
      });

      // If the user is a broker, create a broker record
      if (parsedInput.role === "broker") {
        await supabase.from("brokers").insert({
          id: userData.user?.id,
          license_number: parsedInput.licenseNumber || "",
        });
      }

      // If the user is a lead, create a basic property ad
      if (parsedInput.role === "lead") {
        await supabase.from("property_ads").insert({
          lead_id: userData.user?.id,
          transaction_type: parsedInput.transactionType,
          city: parsedInput.city,
          status: "pending",
        });
      }

      if (error) {
        return actionError("Erro ao criar usuário", error.message);
      }
    } catch (error) {
      return actionError("Erro inesperado. Tente novamente mais tarde.", error as string);
    }

    redirect(paths.auth.verify.getHref(parsedInput.email));
  });
