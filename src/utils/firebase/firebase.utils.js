import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDwG8uaH9LfjgUl6uuPu03wmhhCxadAsFU",
    authDomain: "crwn-clothing-db-f8a4d.firebaseapp.com",
    projectId: "crwn-clothing-db-f8a4d",
    storageBucket: "crwn-clothing-db-f8a4d.appspot.com",
    messagingSenderId: "802048539738",
    appId: "1:802048539738:web:ae08cf6c8acc9d01b22c63"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async(userAuth, addtionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...addtionalInformation
            })
        } catch (e) {
            console.log('Error creating the user', e.message);
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUser = async(email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}