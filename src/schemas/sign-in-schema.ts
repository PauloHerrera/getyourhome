import { z } from "zod";

export const TEXT_INVALID_EMAIL = "Por favor, insira um email válido";
export const TEXT_REQUIRED_FIELD = "Este campo é obrigatório";
export const TEXT_INVALID_CREDENTIALS = "Credenciais inválidas";
export const TEXT_FAILED_SENDING_MAGIC_LINK = "Falha ao enviar link mágico";

export const signInSchema = z.object({
  email: z.string().email(TEXT_INVALID_EMAIL),
  password: z.string().min(1, TEXT_REQUIRED_FIELD),
  remember: z.boolean().optional(),
});

export type SignInInput = z.infer<typeof signInSchema>;
