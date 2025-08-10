
'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = process.env.SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY)
  : null;

if (!getApps().length) {
    try {
        if (serviceAccount) {
            initializeApp({
                credential: cert(serviceAccount),
                databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
            });
        }
    } catch (error: any) {
        console.error('Firebase Admin SDK initialization error:', error.message);
    }
}

const db = getFirestore();

/**
 * Writes a given data object to the 'config/app_data' document in Firestore.
 * @param data The application data object to sync.
 * @returns A promise that resolves with a success or error status.
 */
async function writeDataToFirebase(data: any): Promise<{ success: boolean, error?: string }> {
     if (!serviceAccount) {
        const errorMessage = "Service account key is not configured. Cannot sync with Firebase.";
        console.error(errorMessage);
        return { success: false, error: errorMessage };
    }
    
    try {
        const configCollection = db.collection('config');
        const appDataDoc = configCollection.doc('app_data');

        await appDataDoc.set(data);

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
    return writeDataToFirebase(data);
}

/**
 * Parses a JSON string and syncs the resulting object to Firebase.
 * @param jsonString The JSON data to upload and sync.
 * @returns A promise that resolves with a success or error status.
 */
export async function uploadAndSyncToFirebase(jsonString: string): Promise<{ success: boolean, error?: string }> {
    let data;
    try {
        data = JSON.parse(jsonString);
    } catch (error: any) {
        console.error("Error parsing JSON string:", error);
        return { success: false, error: "Invalid JSON format. " + error.message };
    }
    
    return writeDataToFirebase(data);
}
