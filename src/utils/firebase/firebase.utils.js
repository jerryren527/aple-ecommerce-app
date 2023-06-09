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
	// use firebase's .collection() to get a collection reference object. Similar to doc(), the reference object is made even if the collection object does not exist.
	// Pass in the collectionKey (categories)
	const collectionRef = collection(db, collectionKey);

	// Store all objects to add into collection reference as new documents in one successful transaction.
	// To ensure a complete transaction (proper read and writing operations), use firebase's .writeBatch()
	const batch = writeBatch(db);
	// attach writes, deletes, sets, etc. to batch
	objectsToAdd.forEach((object) => {
		// Pass in 'collectionRef' to .doc() to create a document reference object for the current objct. Pass in the collection reference obj, .doc() is smart enough to infer from the collection reference object that the database is 'db'
		// Also pass in a key value for each object.
		const docRef = doc(collectionRef, object.title.toLowerCase());
		// Using the document reference object, set its value to the object itself.
		batch.set(docRef, object);
	});

	// fire off the batch
	await batch.commit();
	console.log("done");
};

/**
 * @description Queries the documents in categories collection and reduces them into a map.
 * @returns categoryMap
 */

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories"); // get the collection ref object using firebase's .collection()
	const q = query(collectionRef); // generate a query off the collection ref obj.

	// get a snapshot of the collection
	const querySnapshot = await getDocs(q);
	// get an array of the individual documents (as snapshots) inside the collection. Use .reduce() on the array to end up with an object
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data(); // use .data() to get the object from the object snapshot. Then destructure title and items.
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

// createUserDocumentFromAuth is our function that takes in a User Authentication object (what we get from signin in with Google account) called 'userAuth'.
// Creates a User document of the authenticated user.
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;

	// See if there is an existing document reference by using doc(db, collection, uniqueId) to get the document reference object of a particular document.
	// - pass in 'uid', which is included in userAuth object
	// Google still generates this document reference for you even if this document does not exist yet. Heck, the 'users' collection doesn't exist either. There is no actual document, but google still generates a document reference object. Think of the generated document reference as a pointer to a unique space for this document in the db.
	const userDocRef = doc(db, "users", userAuth.uid);

	// Get actual data in document reference object using getDoc(). getDoc() returns a document object that provides methods to check if the document actually exists (use .exists())
	const userSnapShot = await getDoc(userDocRef);
	console.log(userSnapShot.exists());

	// if user data exists
	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			// set an object at the pointed at space in the db (i.e., using the document reference object)
			// Here we pass in an object for 'additionalInformation' that may be useful if the caller function needs some additional information.
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

// Calls firebase's onAuthStateChanged(), which takes in auth object and a custom callback.
// onAuthStateChanged() creates a Listener object, which has the 'next', 'error', and 'complete' function. Here we provide the callback for the 'next' function, which runs when the listeners detects an event on the stream.
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
