
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
  workshopId: z.string().optional(),
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
  id: z.string().describe("A unique ID, typically a combination of workshop-model-service."),
  workshopId: z.string(),
  model: z.string(),
  labourDesc: z.string(),
  labourCode: z.string(),
  basicAmt: z.number(),
});
export type PmsCharge = z.infer<typeof PmsChargeSchema>;

export const WarrantyPlanSchema = z.object({
    key: z.enum(['gold', 'platinum', 'royal_platinum', 'solitaire', 'standard']),
    name: z.string(),
    years: z.number(),
    kms: z.number(),
});
export type WarrantyPlan = z.infer<typeof WarrantyPlanSchema>;

export const WarrantyCoverageSchema = z.object({
    plan: WarrantyPlanSchema.optional(),
    coveredParts: z.array(z.string()),
    conditions: z.object({
        text: z.string(),
    }),
});
export type WarrantyCoverage = z.infer<typeof WarrantyCoverageSchema>;

export type DataObjectType = Workshop | Part | Vehicle | CustomLabor | PmsCharge | Feedback;

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
        engineOilQuantity: z.string().optional(),
    }),
    serviceType: z.string(),
    warrantyPlanKey: WarrantyPlanSchema.shape.key.optional(),
    isUnderStandardWarranty: z.boolean(),
    parts: z.array(PartSchema),
    labor: z.array(LaborSchema),
    recommendedLabor: z.array(LaborSchema).optional(),
    optionalServices: z.array(LaborSchema).optional(),
    totalPrice: z.number(),
});
export type ServiceEstimateData = z.infer<typeof ServiceEstimateDataSchema>;

export const FeedbackSchema = z.object({
  id: z.string().describe("The unique ticket ID."),
  name: z.string(),
  email: z.string().email(),
  mobile: z.string(),
  feedback: z.string(),
  status: z.enum(['Open', 'Resolved']),
  createdAt: z.any().describe("Timestamp from Firestore"),
});
export type Feedback = z.infer<typeof FeedbackSchema>;
