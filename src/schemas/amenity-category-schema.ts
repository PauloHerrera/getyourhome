import { z } from "zod";
import { statusEnum } from "./property-ads-schema";

export const amenityCategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().max(255),
  description: z.string().optional().nullable(),
  status: statusEnum.default("active"),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type AmenityCategory = z.infer<typeof amenityCategorySchema>;
