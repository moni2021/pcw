
'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
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

// Import all local data sources for initial sync or as a fallback.
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
type DataObjectType = Workshop | Part | Vehicle | CustomLabor | PmsCharge;


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

export async function syncToFirebase(data: any): Promise<{ success: boolean, error?: string }> {
    const fullData = {
        workshops,
        vehicles,
        parts: allParts,
        customLabor: allCustomLabor,
        pmsCharges: allPmsCharges,
        threeMCare: threeMCareData,
    };
    return writeDataToFirebase(fullData, false);
}

export async function uploadAndSyncToFirebase(jsonString: string, dataType: DataType): Promise<{ success: boolean, error?: string }> {
    let data;
    try {
        data = JSON.parse(jsonString);
    } catch (error: any) {
        console.error("Error parsing JSON string:", error);
        return { success: false, error: "Invalid JSON format. " + error.message };
    }

    const schema = dataSchemas[dataType];
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
        console.error("Data validation failed:", validationResult.error.flatten());
        return { success: false, error: "JSON data does not match the required format for " + dataType + "." };
    }

    const dataToUpdate = { [dataType]: validationResult.data };
    
    return writeDataToFirebase(dataToUpdate, true); 
}

export async function downloadMasterJson(dataType: DataType): Promise<string> {
    const db = getDb();
    if (!db) {
      // Fallback to local data if DB not connected
      console.warn("Firebase not connected. Falling back to local data for download.");
      const localData = { workshops, vehicles, parts: allParts, customLabor: allCustomLabor, pmsCharges: allPmsCharges, threeMCare: threeMCareData };
      return JSON.stringify(localData[dataType] || {}, null, 2);
    }

    const docRef = db.collection('config').doc('app_data');
    const docSnap = await docRef.get();
    
    if (docSnap.exists()) {
        const data = docSnap.data();
        return JSON.stringify(data?.[dataType] || {}, null, 2);
    }
    return JSON.stringify({}, null, 2);
}

// ---- Live Data Fetching and Mutation Actions ----

export async function getFullDataFromFirebase() {
    const db = getDb();
    if (!db) {
        // Fallback to local data if DB isn't connected
        console.warn("Firebase not connected, returning local fallback data.");
        return {
            workshops,
            vehicles,
            parts: allParts,
            customLabor: allCustomLabor,
            pmsCharges: allPmsCharges,
            threeMCare: threeMCareData,
        };
    }
    
    const docRef = db.collection('config').doc('app_data');
    const docSnap = await docRef.get();
    
    if (docSnap.exists()) {
        return docSnap.data() as any; // Cast as any to simplify usage on client
    } else {
        // If no data in Firestore, return local data as a default
        console.warn("No data in Firestore, returning local fallback data.");
         return { workshops, vehicles, parts: allParts, customLabor: allCustomLabor, pmsCharges: allPmsCharges, threeMCare: threeMCareData, };
    }
}

async function updateArrayInFirebase(dataType: DataType, item: DataObjectType, operation: 'add' | 'update' | 'delete', identifierKey: keyof DataObjectType) {
    const db = getDb();
    if (!db) return { success: false, error: "Database not connected." };
    const docRef = db.collection('config').doc('app_data');

    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) {
                throw new Error("Data document does not exist!");
            }
            
            const currentArray = doc.data()?.[dataType] || [];
            let newArray;

            if (operation === 'add') {
                newArray = [...currentArray, item];
            } else {
                const itemIdentifier = item[identifierKey];
                if(operation === 'update') {
                     newArray = currentArray.map((i: any) => i[identifierKey] === itemIdentifier ? item : i);
                } else { // delete
                     newArray = currentArray.filter((i: any) => i[identifierKey] !== itemIdentifier);
                }
            }
            transaction.update(docRef, { [dataType]: newArray });
        });
        return { success: true };
    } catch (e: any) {
        console.error(`Error in ${operation} for ${dataType}:`, e);
        return { success: false, error: e.message };
    }
}

// Individual item actions
export const addWorkshop = (item: Workshop) => updateArrayInFirebase('workshops', item, 'add', 'id');
export const updateWorkshop = (item: Workshop) => updateArrayInFirebase('workshops', item, 'update', 'id');
export const deleteWorkshop = (item: Workshop) => updateArrayInFirebase('workshops', item, 'delete', 'id');

export const addPart = (item: Part) => updateArrayInFirebase('parts', item, 'add', 'name');
export const updatePart = (item: Part) => updateArrayInFirebase('parts', item, 'update', 'name');
export const deletePart = (item: Part) => updateArrayInFirebase('parts', item, 'delete', 'name');

export const addVehicle = (item: Vehicle) => updateArrayInFirebase('vehicles', item, 'add', 'model');
export const updateVehicle = (item: Vehicle) => updateArrayInFirebase('vehicles', item, 'update', 'model');
export const deleteVehicle = (item: Vehicle) => updateArrayInFirebase('vehicles', item, 'delete', 'model');

// Custom labor needs a composite key for identification, but for simplicity we'll just match all fields for deletion.
// A more robust solution might add a unique ID to each custom labor entry.
async function updateCustomLaborArray(item: CustomLabor, operation: 'add' | 'update' | 'delete') {
    const db = getDb();
    if (!db) return { success: false, error: "Database not connected." };
    const docRef = db.collection('config').doc('app_data');

    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) throw new Error("Data document does not exist!");
            
            const currentArray = doc.data()?.customLabor || [];
            let newArray;

            if (operation === 'add') {
                newArray = [...currentArray, item];
            } else {
                 newArray = currentArray.filter((i: any) => 
                    !(i.name === item.name && i.model === item.model && i.workshopId === item.workshopId)
                );
                if (operation === 'update') {
                    newArray.push(item);
                }
            }
            transaction.update(docRef, { customLabor: newArray });
        });
        return { success: true };
    } catch (e: any) {
        console.error(`Error in ${operation} for custom labor:`, e);
        return { success: false, error: e.message };
    }
}

export const addCustomLabor = (item: CustomLabor) => updateCustomLaborArray(item, 'add');
export const updateCustomLabor = (item: CustomLabor) => updateCustomLaborArray(item, 'update');
export const deleteCustomLabor = (item: CustomLabor) => updateCustomLaborArray(item, 'delete');
