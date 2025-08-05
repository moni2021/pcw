
'use server';
/**
 * @fileOverview User management flows for creating and managing users in Firebase Auth.
 *
 * - createUser - Creates a new user, disabled by default.
 * - listAllUsers - Lists all users from Firebase Auth.
 * - toggleUserStatus - Enables or disables a user account.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

// Initialize Firebase Admin SDK
let adminApp: App;

if (!getApps().length) {
    const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
        throw new Error('Firebase Admin SDK environment variables are not set. Please check your .env file.');
    }

    adminApp = initializeApp({
        credential: credential.cert(serviceAccount),
    });
} else {
  adminApp = getApps()[0];
}


// Schema for creating a user
const CreateUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

const CreateUserOutputSchema = z.object({
  uid: z.string().optional(),
  error: z.string().optional(),
});
export type CreateUserOutput = z.infer<typeof CreateUserOutputSchema>;

// Schema for user list
const UserRecordSchema = z.object({
  uid: z.string(),
  email: z.string().optional(),
  displayName: z.string().optional(),
  disabled: z.boolean(),
  creationTime: z.string(),
});
export type UserRecord = z.infer<typeof UserRecordSchema>;

const ListUsersOutputSchema = z.object({
    users: z.array(UserRecordSchema).optional(),
    error: z.string().optional(),
});
export type ListUsersOutput = z.infer<typeof ListUsersOutputSchema>;

// Schema for toggling user status
const ToggleUserStatusInputSchema = z.object({
    uid: z.string(),
    disabled: z.boolean(),
});
export type ToggleUserStatusInput = z.infer<typeof ToggleUserStatusInputSchema>;

const ToggleUserStatusOutputSchema = z.object({
    uid: z.string().optional(),
    error: z.string().optional(),
});
export type ToggleUserStatusOutput = z.infer<typeof ToggleUserStatusOutputSchema>;


// Exported wrapper functions that call the flows

export async function createUser(input: CreateUserInput): Promise<CreateUserOutput> {
  return createUserFlow(input);
}

export async function listAllUsers(): Promise<ListUsersOutput> {
    return listUsersFlow();
}

export async function toggleUserStatus(input: ToggleUserStatusInput): Promise<ToggleUserStatusOutput> {
    return toggleUserStatusFlow(input);
}


// Genkit Flows

const createUserFlow = ai.defineFlow(
  {
    name: 'createUserFlow',
    inputSchema: CreateUserInputSchema,
    outputSchema: CreateUserOutputSchema,
  },
  async ({ email, password }) => {
    try {
      const userRecord = await getAuth(adminApp).createUser({
        email,
        password,
        disabled: true, // User is disabled by default
      });
      return { uid: userRecord.uid };
    } catch (error: any) {
      return { error: error.message };
    }
  }
);


const listUsersFlow = ai.defineFlow(
  {
    name: 'listUsersFlow',
    outputSchema: ListUsersOutputSchema,
  },
  async () => {
    try {
        const listUsersResult = await getAuth(adminApp).listUsers();
        const users = listUsersResult.users.map(user => ({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            disabled: user.disabled,
            creationTime: user.metadata.creationTime,
        }));
        return { users };
    } catch (error: any) {
        return { error: error.message };
    }
  }
);

const toggleUserStatusFlow = ai.defineFlow({
    name: 'toggleUserStatusFlow',
    inputSchema: ToggleUserStatusInputSchema,
    outputSchema: ToggleUserStatusOutputSchema,
}, async ({ uid, disabled }) => {
    try {
        await getAuth(adminApp).updateUser(uid, { disabled });
        return { uid };
    } catch (error: any) {
        return { error: error.message };
    }
});
