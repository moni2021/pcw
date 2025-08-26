
'use server';

import { initializeApp as initializeAdminApp, getApps as getAdminApps, cert } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getFirestore as getClientFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, where, getDoc, limit, updateDoc, doc, setDoc } from 'firebase/firestore';

import { z } from 'zod';
import { VehicleSchema, PartSchema, CustomLaborSchema, WorkshopSchema, PmsChargeSchema, FeedbackSchema, Feedback, DataObjectType, Workshop, Part, Vehicle, CustomLabor, PmsCharge } from '@/lib/types';
import { db as clientDb } from '@/lib/firebase'; // Client-side DB for public actions
import { isEqual, sortBy } from 'lodash';


// --- Admin SDK Initialization (for secure backend operations) ---
const getAdminDb = () => {
    const adminApps = getAdminApps();
    if (adminApps.length > 0) {
        return getAdminFirestore(adminApps[0]);
    }

    const serviceAccountJson = process.env.SERVICE_ACCOUNT_KEY;
    if (serviceAccountJson) {
        try {
            const serviceAccount = JSON.parse(serviceAccountJson);
            const app = initializeAdminApp({
                credential: cert(serviceAccount),
                databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
            });
            console.log("Firebase Admin SDK initialized successfully for project:", serviceAccount.project_id);
            return getAdminFirestore(app);
        } catch (error: any) {
            console.error('Firebase Admin SDK initialization error:', error.message);
            // Fall through to return null
        }
    } else {
        console.warn("Firebase Admin SDK not initialized. SERVICE_ACCOUNT_KEY is missing.");
    }
    
    return null;
};


// --- Schemas and Local Data (remains the same) ---
const ThreeMCareServiceSchema = z.object({
  name: z.string(),
  charge: z.number(),
});
const ThreeMCareSchema = z.record(z.array(ThreeMCareServiceSchema));

import { workshopData } from '@/lib/workshop-data-loader';
import { workshops } from '@/lib/data/workshops';
import { vehicles } from '@/lib/data';
import { allParts } from '@/lib/data/parts';
import { threeMCareData } from '@/lib/data/3m';

const allCustomLabor = [...workshopData.customLabor];
const allPmsCharges = [...workshopData.pmsCharges];

const dataSchemas = {
  workshops: z.array(WorkshopSchema),
  vehicles: z.array(VehicleSchema),
  parts: z.array(PartSchema),
  customLabor: z.array(CustomLaborSchema),
  pmsCharges: z.array(PmsChargeSchema),
  threeMCare: ThreeMCareSchema,
  feedback: z.array(FeedbackSchema),
};

type FullLocalDataType = ReturnType<typeof getFullLocalData>;
type DataType = keyof FullLocalDataType;


const getFullLocalData = () => ({
    workshops,
    vehicles,
    parts: allParts,
    customLabor: allCustomLabor,
    pmsCharges: allPmsCharges,
    threeMCare: threeMCareData,
});

// --- Admin-Only Actions (use Admin SDK) ---

async function writeDataToFirebase(collectionName: string, docId: string, data: any, merge: boolean = false): Promise<{ success: boolean, error?: string }> {
     const db = getAdminDb();
     if (!db) {
        const errorMessage = "Service account key is not configured. Cannot sync with Firebase.";
        console.error(errorMessage);
        return { success: false, error: errorMessage };
    }
    
    try {
        const docRef = db.collection(collectionName).doc(docId);
        await docRef.set(data, { merge });
        console.log(`Data successfully written to Firebase Firestore in ${collectionName}/${docId}.`);
        return { success: true };
    } catch (error: any) {
        console.error('Error writing data to Firebase:', error);
        return { success: false, error: error.message || 'An unknown error occurred during Firebase write.' };
    }
}

export async function syncToFirebase(): Promise<{ success: boolean, error?: string }> {
    const fullData = getFullLocalData();
    return writeDataToFirebase('config', 'app_data', { appData: fullData }, false);
}


export type ComparisonResult = {
    [key in DataType]?: {
        added: any[];
        updated: { local: any; remote: any }[];
        unchanged: number;
        removed: any[];
    }
};

export async function compareLocalAndFirebaseData(): Promise<{ success: boolean; data?: ComparisonResult; error?: string }> {
    const db = getAdminDb();
    if (!db) {
        return { success: false, error: "Service account key is not configured. Cannot connect to Firebase." };
    }

    try {
        const localData = getFullLocalData();
        const firebaseData = await getFullDataFromFirebase();
        const comparison: ComparisonResult = {};
        
        const dataKeys = Object.keys(localData) as DataType[];

        for (const key of dataKeys) {
            const localItems = localData[key];
            const remoteItems = firebaseData[key];
            
            comparison[key] = { added: [], updated: [], unchanged: 0, removed: [] };

            if (Array.isArray(localItems) && Array.isArray(remoteItems)) {
                const localMap = new Map(localItems.map(item => [item.id || item.name, item]));
                const remoteMap = new Map(remoteItems.map(item => [item.id || item.name, item]));

                // Check for added and updated items
                for (const [id, localItem] of localMap.entries()) {
                    if (!remoteMap.has(id)) {
                        comparison[key]?.added.push(localItem);
                    } else {
                        const remoteItem = remoteMap.get(id)!;
                        // Use lodash isEqual for deep comparison, ignoring order in nested arrays by sorting them
                        const sortedLocal = sortObjectArrays(localItem);
                        const sortedRemote = sortObjectArrays(remoteItem);

                        if (!isEqual(sortedLocal, sortedRemote)) {
                            comparison[key]?.updated.push({ local: localItem, remote: remoteItem });
                        } else {
                            comparison[key]!.unchanged++;
                        }
                    }
                }

                // Check for removed items
                for (const [id, remoteItem] of remoteMap.entries()) {
                    if (!localMap.has(id)) {
                        comparison[key]?.removed.push(remoteItem);
                    }
                }
            } else if (typeof localItems === 'object' && localItems !== null && typeof remoteItems === 'object' && remoteItems !== null) {
                // Handle object comparison (for 3M Care)
                if (!isEqual(localItems, remoteItems)) {
                    comparison[key]!.updated.push({ local: localItems, remote: remoteItems });
                } else {
                    comparison[key]!.unchanged++;
                }
            }
        }
        
        return { success: true, data: comparison };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Helper to sort arrays within an object for consistent comparison
function sortObjectArrays(obj: any) {
    if (obj === null || typeof obj !== 'object') return obj;
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            // Check if array elements are objects with a sortable key
            if (obj[key].length > 0 && typeof obj[key][0] === 'object' && obj[key][0] !== null) {
                if ('name' in obj[key][0]) {
                    newObj[key] = sortBy(obj[key], 'name');
                } else if ('id' in obj[key][0]) {
                     newObj[key] = sortBy(obj[key], 'id');
                } else {
                    newObj[key] = obj[key]; // Cannot sort reliably
                }
            } else {
                 newObj[key] = [...obj[key]].sort();
            }
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}


export async function uploadAndSyncToFirebase(jsonString: string, dataType: keyof typeof dataSchemas): Promise<{ success: boolean, error?: string }> {
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

    const dataToUpdate = { appData: { [dataType]: validationResult.data } };
    
    return writeDataToFirebase('config', 'app_data', dataToUpdate, true); 
}

export async function downloadMasterJson(dataType: DataType): Promise<string> {
    const db = getAdminDb();
    if (!db) {
      console.warn("Firebase not connected. Falling back to local data for download.");
      const localData = getFullLocalData();
      return JSON.stringify(localData[dataType] || {}, null, 2);
    }

    const docRef = db.collection('config').doc('app_data');
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
        const data = docSnap.data()?.appData;
        return JSON.stringify(data?.[dataType] || {}, null, 2);
    }
    return JSON.stringify({}, null, 2);
}

export async function getFullDataFromFirebase(): Promise<FullLocalDataType> {
    const db = getAdminDb();
    const localData = getFullLocalData();
    if (!db) {
        console.warn("Firebase not connected, returning local fallback data.");
        return localData;
    }
    
    try {
        const docRef = db.collection('config').doc('app_data');
        const docSnap = await docRef.get();
        
        if (docSnap.exists) {
            const firestoreData = docSnap.data()?.appData;
            return {
                ...localData,
                ...firestoreData
            };
        } else {
            console.warn("No data in Firestore. Performing initial sync and returning local data.");
            await syncToFirebase();
            return localData;
        }
    } catch (error: any) {
        console.error("Error fetching data from Firebase: ", error);
        console.warn("Returning local fallback data due to Firebase fetch error.");
        return localData;
    }
}

async function updateArrayInFirebase(dataType: keyof (ReturnType<typeof getFullLocalData>), item: DataObjectType, operation: 'add' | 'update' | 'delete', identifierKey: keyof DataObjectType) {
    const db = getAdminDb();
    if (!db) return { success: false, error: "Database not connected." };
    const docRef = db.collection('config').doc('app_data');

    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) {
                throw new Error("Data document does not exist!");
            }
            
            const currentArray = doc.data()?.appData?.[dataType] || [];
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
            transaction.set(docRef, { appData: { [dataType]: newArray } }, { merge: true });
        });
        return { success: true };
    } catch (e: any) {
        console.error(`Error in ${operation} for ${dataType}:`, e);
        return { success: false, error: e.message };
    }
}

export async function addWorkshop(item: Workshop) { return updateArrayInFirebase('workshops', item, 'add', 'id'); }
export async function updateWorkshop(item: Workshop) { return updateArrayInFirebase('workshops', item, 'update', 'id'); }
export async function deleteWorkshop(item: Workshop) { return updateArrayInFirebase('workshops', item, 'delete', 'id'); }

export async function addPart(item: Part) { return updateArrayInFirebase('parts', item, 'add', 'name'); }
export async function updatePart(item: Part) { return updateArrayInFirebase('parts', item, 'update', 'name'); }
export async function deletePart(item: Part) { return updateArrayInFirebase('parts', item, 'delete', 'name'); }

export async function addVehicle(item: Vehicle) { return updateArrayInFirebase('vehicles', item, 'add', 'model'); }
export async function updateVehicle(item: Vehicle) { return updateArrayInFirebase('vehicles', item, 'update', 'model'); }
export async function deleteVehicle(item: Vehicle) { return updateArrayInFirebase('vehicles', item, 'delete', 'model'); }

async function updateCustomLaborArray(item: CustomLabor, operation: 'add' | 'update' | 'delete') {
    const db = getAdminDb();
    if (!db) return { success: false, error: "Database not connected." };
    const docRef = db.collection('config').doc('app_data');

    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) throw new Error("Data document does not exist!");
            
            const currentArray: CustomLabor[] = doc.data()?.appData?.customLabor || [];
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
            transaction.set(docRef, { appData: { customLabor: newArray } }, { merge: true });
        });
        return { success: true };
    } catch (e: any) {
        console.error(`Error in ${operation} for custom labor:`, e);
        return { success: false, error: e.message };
    }
}

export async function addCustomLabor(item: CustomLabor) { return updateCustomLaborArray(item, 'add'); }
export async function updateCustomLabor(originalItem: CustomLabor, updatedItem: CustomLabor) {
    const deleteResult = await deleteCustomLabor(originalItem);
    if (!deleteResult.success) return deleteResult;
    return await addCustomLabor(updatedItem);
}
export async function deleteCustomLabor(item: CustomLabor) { return updateCustomLaborArray(item, 'delete'); }

export async function addPmsCharge(item: PmsCharge) { return updateArrayInFirebase('pmsCharges', item, 'add', 'id'); }
export async function updatePmsCharge(item: PmsCharge) { return updateArrayInFirebase('pmsCharges', item, 'update', 'id'); }
export async function deletePmsCharge(item: PmsCharge) { return updateArrayInFirebase('pmsCharges', item, 'delete', 'id'); }


// --- Public-Facing Actions (use Client SDK for read/write, Admin for privileged ops) ---

export async function addFeedback(data: Omit<Feedback, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        // Generate a new document reference first to get a unique ID
        const newFeedbackRef = doc(collection(clientDb, 'feedback'));
        
        // Create the user-friendly ticket ID from the document's unique ID
        const ticketId = `MONI-${newFeedbackRef.id.substring(0, 6).toUpperCase()}`;

        // Create the full feedback object
        const feedbackData: Feedback = {
            ...data,
            id: ticketId,
            status: 'Open',
            createdAt: serverTimestamp(),
        };

        // Set the document with the full data in a single operation
        await setDoc(newFeedbackRef, feedbackData);

        return { success: true, id: ticketId };

    } catch (e: any) {
        console.error("Error adding feedback:", e);
        return { success: false, error: e.message };
    }
}

export async function getFeedback(): Promise<{ success: boolean, data?: Feedback[], error?: string }> {
    try {
        const feedbackCollection = collection(clientDb, 'feedback');
        const q = query(feedbackCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        const feedbackList: Feedback[] = snapshot.docs.map(doc => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
            return { ...data, createdAt } as Feedback;
        });

        return { success: true, data: feedbackList };
    } catch (e: any) {
        console.error("Error fetching feedback:", e);
        return { success: false, error: e.message };
    }
}

export async function updateFeedbackStatus(ticketId: string, status: 'Open' | 'Resolved'): Promise<{ success: boolean; error?: string }> {
    const db = getAdminDb(); // Use Admin SDK for this to ensure only admins can do it
    if (!db) return { success: false, error: 'Database not connected. Please configure service account key.' };

    try {
        // Since the user-friendly ID is `id`, we query by it to find the actual document ID.
        const q = db.collection('feedback').where('id', '==', ticketId).limit(1);
        const querySnapshot = await q.get();

        if (querySnapshot.empty) {
            return { success: false, error: `Feedback ticket with ID ${ticketId} not found.` };
        }
        
        const docToUpdate = querySnapshot.docs[0].ref;
        await docToUpdate.update({ status });
        
        return { success: true };
    } catch (e: any) {
        console.error("Error updating feedback status:", e);
        return { success: false, error: e.message };
    }
}
