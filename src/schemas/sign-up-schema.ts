import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(11),
  role: z.enum(["lead", "broker", "admin"]),
  termsAccepted: z.boolean(),
  licenseNumber: z.string().optional(),
  transactionType: z.enum(["sale", "rent", "sale_rent"]),
  city: z.string().optional(),
});

export { signUpSchema };

export type SignUpFormData = z.infer<typeof signUpSchema>;
