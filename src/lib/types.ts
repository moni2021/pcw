
import { z } from 'zod';

export const WorkshopSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string().optional(),
});
export type Workshop = z.infer<typeof WorkshopSchema>;

export const VehicleSchema = z.object({
  model: z.string(),
  brand: z.enum(['Arena', 'Nexa', 'Commercial']),
  category: z.string(),
  variants: z.array(z.string()),
  fuelTypes: z.array(z.string()),
  productionYears: z.array(z.number()),
  engineOilQuantity: z.string().optional(),
  engineOilLiters: z.number().optional(),
  defaultEngineOil: z.string().optional(),
});
export type Vehicle = z.infer<typeof VehicleSchema>;


export const PartSchema = z.object({
  name: z.string(),
  price: z.number(), // For engine oil, this will be price per liter
});
export type Part = z.infer<typeof PartSchema>;


export const LaborSchema = z.object({
  name: z.string(),
  charge: z.number(),
});
export type Labor = z.infer<typeof LaborSchema>;

export const CustomLaborSchema = z.object({
    workshopId: z.string(),
    name: z.string(),
    model: z.string(),
    charge: z.number(),
});
export type CustomLabor = z.infer<typeof CustomLaborSchema>;

export const PmsChargeSchema = z.object({
  workshopId: z.string(),
  model: z.string(),
  labourDesc: z.string(),
  labourCode: z.string(),
  basicAmt: z.number(),
});
export type PmsCharge = z.infer<typeof PmsChargeSchema>;


export const ServiceSchema = z.object({
  parts: z.array(PartSchema),
  labor: z.array(LaborSchema), // This will now be dynamically populated
  recommendedLabor: z.array(LaborSchema).optional(),
  optionalServices: z.array(LaborSchema).optional(),
});
export type Service = z.infer<typeof ServiceSchema>;


export const ServiceDataSchema = z.record(ServiceSchema);
export type ServiceData = z.infer<typeof ServiceDataSchema>;

export const ServiceEstimateDataSchema = z.object({
    workshopId: z.string(),
    vehicle: z.object({
        model: z.string(),
        fuelType: z.string(),
        productionYear: z.number(),
        brand: z.string(),
        category: z.string(),
        engineOilLiters: z.number().optional(),
        defaultEngineOil: z.string().optional(),
    }),
    serviceType: z.string(),
    parts: z.array(PartSchema),
    labor: z.array(LaborSchema),
    recommendedLabor: z.array(LaborSchema).optional(),
    optionalServices: z.array(LaborSchema).optional(),
    totalPrice: z.number(),
});
export type ServiceEstimateData = z.infer<typeof ServiceEstimateDataSchema>;
