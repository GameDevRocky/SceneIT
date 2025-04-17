import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const db = getFirestore();

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user, { url: 'http://localhost:5173/' });

    await updateProfile(user);
    
    const userData = {
        email: user.email,
        id: user.uid,
        isNewUser: true,
        authenticated: false,
        events : []

    };
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
        email: user.email,
        name: user.displayName,
        id: user.uid,
        isNewUser: false,
        events : []
    };

    await setDoc(doc(db, "users", user.uid), {
        ...userData
    }, { merge: true });

    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};


export const doPasswordReset = (email) =>{
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) =>{

    return updatePassword(auth.currentUser, password)
}

export const doSendEmailVerification = () =>{
    return sendEmailVerification(auth.currentUser,
        {url: `${window.location.origin}/home`,
    })
}