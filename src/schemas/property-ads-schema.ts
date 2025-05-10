import { z } from "zod";

export const statusEnum = z.enum(["active", "inactive", "pending"]);
export const transactionTypeEnum = z.enum(["sale", "rent", "sale_rent"]);

export const propertyAdSchema = z.object({
  lead_id: z.string().uuid(),
  status: statusEnum,
  transaction_type: transactionTypeEnum,
  property_type_id: z.string().uuid(),
  acquisition_purpose: z.string().max(100).optional().nullable(),
  minBudget: z.number().min(0),
  maxBudget: z.number().min(0),
  minArea: z.number().min(0),
  maxArea: z.number().min(0),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  parkingSpaces: z.number().int().min(0),
  neighborhood: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  uf: z.string().optional().nullable(),
  mandatoryAmenities: z.object({}).nullable(),
  desiredAmenities: z.object({}).nullable(),
  observations: z.string().optional().nullable(),
});

export type PropertyAdFormData = z.infer<typeof propertyAdSchema>;
