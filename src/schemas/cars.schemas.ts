import { z } from "zod";

export const carSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().nullish(),
  brand: z.string().min(1),
  year: z.number().positive(),
  km: z.number().positive(),
  userId: z.string(),
});

export const createCarSchema = carSchema.omit({ id: true, userId: true });

export type TCarSchema = z.infer<typeof carSchema>;

export type TCreateCar = z.infer<typeof createCarSchema>;

export const updateCarSchema = createCarSchema.partial();

export type TUpdateCarBody = z.infer<typeof updateCarSchema>;
