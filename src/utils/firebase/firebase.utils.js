import { initializeApp } from "firebase/app";

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	// EmailAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAEoYn_d5lWZbL1bHGUn_bBMLH9Dzy9QOo",
	authDomain: "apple-store-db.firebaseapp.com",
	projectId: "apple-store-db",
	storageBucket: "apple-store-db.appspot.com",
	messagingSenderId: "319118544975",
	appId: "1:319118544975:web:b1975ba58272c888401a3a",
};

const app = initializeApp(firebaseConfig);

// Added email auth provider
// export const getNewEmailCredentials = (email, password) => EmailAuthProvider.credential(email, password);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth(); // export our auth instance

export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // export anon. function that returns signInWithPopup function that takes in an auth instance and a provider instance.

const db = getFirestore();

/**
 * @description Add collection and its documeents to Firebase database based on passed in 'objectsToAdd' object.
 * @param {string} collectionKey
 * @param {object} objectsToAdd
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);

	const batch = writeBatch(db);
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());

		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("done");
};

/**
 * @description Queries the documents in categories collection and reduces them into a map.
 * @returns categoryMap
 */

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapShot = await getDoc(userDocRef);
	console.log(userSnapShot.exists());

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	// protective code.
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	// protective code.
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
