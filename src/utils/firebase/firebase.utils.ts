import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextFn,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  //2
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// ! For typeScript
import { QueryDocumentSnapshot } from "firebase/firestore";
import { Category } from "../../store/category/category.types";

const firebaseConfig = {
  apiKey: "AIzaSyDcNzQj7QkqJ15ITnfaus0Fqz-davDTJW4",
  authDomain: "clothing-store-db-46c65.firebaseapp.com",
  projectId: "clothing-store-db-46c65",
  storageBucket: "clothing-store-db-46c65.appspot.com",
  messagingSenderId: "429819807617",
  appId: "1:429819807617:web:4271c19b4b04bc6e148a80",
};

// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  // whenever someone tries to login with google first let him choose the account with which he wants to sign in from the list of available accounts
  prompt: "select_account",
});
export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

//2
export type ObjectToAdd = {
  title: string;
};
export const addCollectionAndDocument = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: Array<T>
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Array<Category>> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  console.log(querySnapshot.docs);
  const categoryMap = querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
  // .reduce((acc, docSnapshot) => {
  //     const { title, items } = docSnapshot.data();
  //     //console.log(`Docsnapshot.data`);
  //     //console.log(docSnapshot.data());
  //     acc[title.toLowerCase()] = items;
  //     return acc;
  // }, {})
  return categoryMap;
};

///////////////////////////////////////

export type AdditionalInformation = {
  displayName?: string;
};
export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  console.log(userAuth);
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
