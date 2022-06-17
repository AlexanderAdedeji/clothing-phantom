import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd-bEfhZZEvlo3k5Gu-Yl2Gncu0IxjJgw",
  authDomain: "clothing-phantom-db.firebaseapp.com",
  projectId: "clothing-phantom-db",
  storageBucket: "clothing-phantom-db.appspot.com",
  messagingSenderId: "894034345457",
  appId: "1:894034345457:web:1c6fe5495b24436a17d850",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  //doc(database=> getFirestore instance, collection=> "users",identifier=> "unique id of each user" )
  const userDocRef = doc(db, "Users", userAuth.uid);

  //this function helps to get the documenet from firestore
  const userSnapshot = await getDoc(userDocRef);


  //check if the user already exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
        console.log(error.message)
    }


  }
  return userDocRef
};
