import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions();

type IsOwnerRequest = Record<string, never>;
type IsOwnerResponse = { uid: string; success: boolean };
export async function checkIsOwner(): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) return false;
    const isOwnerFunc = httpsCallable<IsOwnerRequest, IsOwnerResponse>(
      functions,
      "isOwner"
    );
    const result = await isOwnerFunc();

    return result.data.success === true;
  } catch (error) {
    console.error("Error checking owner status:", error);
    return false;
  }
}

export default app;
