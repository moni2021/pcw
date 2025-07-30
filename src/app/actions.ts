'use server';

import { estimateBill, type EstimateBillInput, type EstimateBillOutput } from '@/ai/flows/estimate-bill';
import { z } from 'zod';

const ActionInputSchema = z.object({
  vehicleModel: z.string(),
  serviceType: z.string(),
  fuelType: z.string(),
});

export async function getBillEstimate(
  input: EstimateBillInput
): Promise<{ success: true; data: EstimateBillOutput } | { success: false; error: string }> {
  const parsedInput = ActionInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }

  try {
    const estimation = await estimateBill(parsedInput.data);
    return { success: true, data: estimation };
  } catch (error) {
    console.error('Error getting bill estimate:', error);
    return { success: false, error: 'Failed to generate an estimate. Our AI is currently busy, please try again later.' };
  }
}
