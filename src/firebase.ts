import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore,
  doc, 
  getDoc,
  collection, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where,
  orderBy, 
  limit,
  getDocFromServer
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  onAuthStateChanged, 
  signOut,
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

// Initialize Firestore with custom Database ID & robust auto-detect long polling
let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(
    app,
    {
      experimentalAutoDetectLongPolling: true,
      ignoreUndefinedProperties: true
    },
    firebaseConfig.firestoreDatabaseId
  );
} catch {
  // If already initialized, fallback to getFirestore
  firestoreInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

export const db = firestoreInstance;

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
  const isOfflineOrUnavailable = 
    error instanceof Error && 
    (error.message.includes('unavailable') || 
     error.message.includes('offline') || 
     error.message.includes('network'));

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

  if (isOfflineOrUnavailable) {
    console.info('Firestore operation using offline/cached local state for:', path);
  } else {
    console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
  }
  return errInfo;
}

// Initialize or Reset reCAPTCHA Verifier for Phone Auth
export const initRecaptchaVerifier = (containerId: string = 'recaptcha-container'): RecaptchaVerifier | null => {
  if (typeof window === 'undefined') return null;
  
  const container = document.getElementById(containerId);
  if (!container) {
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
      callback: () => {
        // reCAPTCHA verified callback
      },
      'expired-callback': () => {
        console.warn('reCAPTCHA expired. Please request OTP again.');
      }
    });

    return window.recaptchaVerifier;
  } catch (error) {
    console.warn('RecaptchaVerifier setup notice:', error);
    return null;
  }
};

// Test Connection to Firestore as per Firebase Skill guidelines
export async function testConnection() {
  try {
    await getDoc(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('unavailable'))) {
      console.info('Firestore client is operating with local cache / offline fallback.');
    }
  }
}

// Run connection validation safely in background
if (typeof window !== 'undefined') {
  setTimeout(() => {
    testConnection().catch(() => {});
  }, 2000);
}

export {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  signOut,
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

