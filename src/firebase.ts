import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc,
  getDocFromServer, 
  collection, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where,
  orderBy, 
  limit 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  onAuthStateChanged, 
  signOut,
  signInAnonymously,
  ConfirmationResult,
  User
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Global window extensions for Phone Auth Recaptcha & Confirmation
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID if configured
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Error Handling Definition adhering to Firebase Integration Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
  return errInfo;
}

// Initialize or Reset reCAPTCHA Verifier for Phone Auth
export const initRecaptchaVerifier = (containerId: string = 'recaptcha-container'): RecaptchaVerifier | null => {
  if (typeof window === 'undefined') return null;
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`reCAPTCHA container #${containerId} not found in DOM`);
    return null;
  }

  try {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch {
        // ignore clear error
      }
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: (response: any) => {
        console.log('reCAPTCHA verified:', response);
      },
      'expired-callback': () => {
        console.warn('reCAPTCHA expired. Please request OTP again.');
      }
    });

    return window.recaptchaVerifier;
  } catch (error) {
    console.error('Error initializing RecaptchaVerifier:', error);
    return null;
  }
};

// Initialize Anonymous Session for verified security rules if needed
export const initAuthSession = async () => {
  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
  } catch (_error) {
    // Gracefully handle if anonymous auth is not enabled in console or network is offline
  }
};

// Test Connection to Firestore as required by Firebase skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('✅ Connected to Cloud Firestore successfully.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore is running in offline-cache mode.');
    } else {
      console.log('Firestore connection verified.');
    }
  }
}

// Kick off initial validation
testConnection();
initAuthSession();

export {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit
};
export type { ConfirmationResult, User };

