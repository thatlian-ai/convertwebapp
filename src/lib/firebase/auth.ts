import {
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from './config';
import { User, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const onAuthStateChanged = (authEnv: any, cb: (user: User | null) => void) => {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        return firebaseOnAuthStateChanged(authEnv, cb);
    } else {
        cb(null);
        return () => { };
    }
}

export const signInWithGoogle = async () => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        alert("Firebase is not configured. Please add your API Key to .env.local");
        return null;
    }
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error;
    }
};

export const signInWithEmail = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        console.error("Error signing in with email", error);
        throw error;
    }
};

export const signUpWithEmail = async (email: string, password: string) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        console.error("Error signing up with email", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
        throw error;
    }
};
