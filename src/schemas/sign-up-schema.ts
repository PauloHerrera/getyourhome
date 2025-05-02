import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(11),
  name: z.string().min(1),
  lastName: z.string().min(1),
  termsAccepted: z.boolean(),
  // role: z.enum(["lead", "broker", "admin"]),
});

export { signUpSchema };

export type SignUpFormData = z.infer<typeof signUpSchema>;
