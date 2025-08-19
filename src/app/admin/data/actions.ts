
'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { z } from 'zod';
import { VehicleSchema, PartSchema, CustomLaborSchema, WorkshopSchema, PmsChargeSchema } from '@/lib/types';


const getDb = () => {
    if (!getApps().length) {
        const serviceAccount = process.env.SERVICE_ACCOUNT_KEY
          ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY)
          : null;
        if (serviceAccount) {
            try {
                initializeApp({
                    credential: cert(serviceAccount),
                    databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
                });
            } catch (error: any) {
                console.error('Firebase Admin SDK initialization error:', error.message);
            }
        } else {
            console.warn("Firebase Admin SDK not initialized. SERVICE_ACCOUNT_KEY is missing.");
        }
    }
    // Only return getFirestore() if an app has been initialized
    return getApps().length > 0 ? getFirestore() : null;
};

const ThreeMCareServiceSchema = z.object({
  name: z.string(),
  charge: z.number(),
});

const ThreeMCareSchema = z.record(z.array(ThreeMCareServiceSchema));

// We need to bring in the workshop-specific data for a master sync/download
import { workshopData } from '@/lib/workshop-data-loader';
import { workshops } from '@/lib/data/workshops';
import { vehicles } from '@/lib/data';
import { allParts } from '@/lib/data/parts';
import { threeMCareData } from '@/lib/data/3m';

const allCustomLabor = [...workshopData.customLabor];
const allPmsCharges = [...workshopData.pmsCharges];

const dataSchemas = {
  vehicles: z.array(VehicleSchema),
  parts: z.array(PartSchema),
  customLabor: z.array(CustomLaborSchema),
  pmsCharges: z.array(PmsChargeSchema),
  workshops: z.array(WorkshopSchema),
  threeMCare: ThreeMCareSchema,
};

type DataType = keyof typeof dataSchemas;


/**
 * Writes data to a single document in Firestore, either overwriting the whole document or merging specific fields.
 * @param data The data object to write.
 * @param merge If true, merges the data with the existing document. If false, overwrites.
 * @returns A promise that resolves with a success or error status.
 */
async function writeDataToFirebase(data: any, merge: boolean = false): Promise<{ success: boolean, error?: string }> {
     const db = getDb();
     if (!db) {
        const errorMessage = "Service account key is not configured. Cannot sync with Firebase.";
        console.error(errorMessage);
        return { success: false, error: errorMessage };
    }
    
    try {
        const appDataDocRef = db.collection('config').doc('app_data');
        await appDataDocRef.set(data, { merge });

        console.log('Data successfully written to Firebase Firestore.');
        return { success: true };
    } catch (error: any) {
        console.error('Error writing data to Firebase:', error);
        return { success: false, error: error.message || 'An unknown error occurred during Firebase write.' };
    }
}


/**
 * Syncs the entire application data (from local files) to a single document in Firestore.
 * @param data The complete application data object.
 * @returns A promise that resolves with a success or error status.
 */
export async function syncToFirebase(data: any): Promise<{ success: boolean, error?: string }> {
    return writeDataToFirebase(data, false); // Overwrite the document completely
}

/**
 * Parses a JSON string for a specific data type, validates it, and syncs it to Firebase.
 * This performs a partial update on the main data document.
 * @param jsonString The JSON data to upload and sync.
 * @param dataType The key for the data being updated (e.g., 'vehicles', 'parts').
 * @returns A promise that resolves with a success or error status.
 */
export async function uploadAndSyncToFirebase(jsonString: string, dataType: DataType): Promise<{ success: boolean, error?: string }> {
    let data;
    try {
        data = JSON.parse(jsonString);
    } catch (error: any) {
        console.error("Error parsing JSON string:", error);
        return { success: false, error: "Invalid JSON format. " + error.message };
    }

    // Validate the parsed data against the corresponding schema
    const schema = dataSchemas[dataType];
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
        console.error("Data validation failed:", validationResult.error.flatten());
        return { success: false, error: "JSON data does not match the required format for " + dataType + "." };
    }

    // Prepare data for a partial update
    const dataToUpdate = { [dataType]: validationResult.data };
    
    // Use merge option to only update the specified field
    return writeDataToFirebase(dataToUpdate, true); 
}

/**
 * Generates a JSON string for a given data type from the current application data.
 * @param dataType The type of data for which to generate the JSON.
 * @returns A JSON string representing the data.
 */
export async function downloadMasterJson(dataType: DataType): Promise<string> {
    let dataObject;
    switch(dataType) {
        case 'vehicles':
            dataObject = vehicles;
            break;
        case 'parts':
            dataObject = allParts;
            break;

        case 'customLabor':
            dataObject = allCustomLabor;
            break;
        case 'pmsCharges':
             dataObject = allPmsCharges;
            break;
        case 'workshops':
            dataObject = workshops;
            break;
        case 'threeMCare':
            dataObject = threeMCareData;
            break;
        default:
            // This is a safety net, but based on the UI, dataType should always be valid.
            const exhaustiveCheck: never = dataType;
            throw new Error(`Unhandled data type: ${exhaustiveCheck}`);
    }
    return JSON.stringify(dataObject, null, 2);
}

    