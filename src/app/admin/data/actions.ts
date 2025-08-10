
'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Path to your service account key file.
// IMPORTANT: This file should be stored securely and not exposed to the public.
// In a production environment, you should use environment variables.
const serviceAccount = process.env.SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY)
  : null;

// Initialize Firebase Admin SDK
if (!getApps().length) {
    try {
        initializeApp({
            credential: cert(serviceAccount!),
            databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
        });
    } catch (error: any) {
        console.error('Firebase Admin SDK initialization error:', error.message);
    }
}

const db = getFirestore();

/**
 * Syncs the entire application data to a single document in Firestore.
 * @param data The complete application data object.
 * @returns A promise that resolves with a success or error status.
 */
export async function syncToFirebase(data: any): Promise<{ success: boolean, error?: string }> {
    if (!serviceAccount) {
        const errorMessage = "Service account key is not configured. Cannot sync with Firebase.";
        console.error(errorMessage);
        return { success: false, error: errorMessage };
    }
    
    try {
        const configCollection = db.collection('config');
        const appDataDoc = configCollection.doc('app_data');

        // Set the document with the provided data. This will overwrite any existing data.
        await appDataDoc.set(data);

        console.log('Data successfully synced to Firebase Firestore.');
        return { success: true };
    } catch (error: any) {
        console.error('Error syncing data to Firebase:', error);
        return { success: false, error: error.message || 'An unknown error occurred during Firebase sync.' };
    }
}
