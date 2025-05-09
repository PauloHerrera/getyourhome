import { z } from "zod";
import { statusEnum } from "./property-ads-schema";

export const propertyAmenitySchema = z.object({
  id: z.string().uuid().optional(),
  status: statusEnum.default("active"),
  name: z.string().max(255),
  description: z.string().optional().nullable(),
  amenity_category_id: z.string().uuid(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type PropertyAmenity = z.infer<typeof propertyAmenitySchema>;
