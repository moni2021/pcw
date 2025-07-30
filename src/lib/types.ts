import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string(),
  fuelTypes: z.array(z.string()),
  imageUrl: z.string().optional(),
});
export type Vehicle = z.infer<typeof VehicleSchema>;


export const PartSchema = z.object({
  name: z.string(),
  price: z.number(),
});
export type Part = z.infer<typeof PartSchema>;


export const LaborSchema = z.object({
  name: z.string(),
  charge: z.number(),
});
export type Labor = z.infer<typeof LaborSchema>;


export const ServiceSchema = z.object({
  parts: z.array(PartSchema),
  labor: z.array(LaborSchema),
});
export type Service = z.infer<typeof ServiceSchema>;


export const ServiceDataSchema = z.record(ServiceSchema);
export type ServiceData = z.infer<typeof ServiceDataSchema>;

export const ServiceEstimateDataSchema = z.object({
    vehicle: z.object({
        model: z.string(),
        fuelType: z.string(),
    }),
    serviceType: z.string(),
    parts: z.array(PartSchema),
    labor: z.array(LaborSchema),
    totalPrice: z.number(),
});
export type ServiceEstimateData = z.infer<typeof ServiceEstimateDataSchema>;
