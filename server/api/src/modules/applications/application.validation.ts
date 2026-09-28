import { z } from "zod";

export const createApplicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Application name must contain at least 2 characters")
    .max(100, "Application name must not exceed 100 characters"),
});

export const updateApplicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Application name must contain at least 2 characters")
    .max(100, "Application name must not exceed 100 characters")
    .optional(),
});

export const applicationIdSchema = z.object({
  id: z.uuid(),
});

export type CreateApplicationInput = z.infer<
  typeof createApplicationSchema
>;

export type UpdateApplicationInput = z.infer<
  typeof updateApplicationSchema
>;