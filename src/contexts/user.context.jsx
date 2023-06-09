import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

// The Provider is the actual component that wraps around any other components that need access to the values in the context.
// Provide a value prop to the Provider component. 'value' which holds the actual values that the children components can access.
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	// Mount the listener on mount.
	useEffect(() => {
		// onAuthStateChangedListener() receives an auth object, and a custom callback. It calls onAuthStateChanged(), which calls the callback when the auth object changes (i.e. when the auth's state changes like when user signs in or out).
		// The listener is an open listener, meaning it permanently listens to changes to auth state. So you need to remember to remove it when this component unmounts.
		// onAuthStateChanged() returns a function that unsubscribes the listener. We can return it in useEffect's cleanup function.
		// onAuthStateChanged() automatically checks the auth state the moment the listener is initialized.
		const unsubsribe = onAuthStateChangedListener((user) => {
			// Only create a user document if 'user' is not null (i.e., a user logs in).
			if (user) {
				createUserDocumentFromAuth(user);
			}
			// 'user' is null when the user is signed out. Else, the user object represents the authenticated user. In any case, call setCurrentUser()
			setCurrentUser(user);
		});

		// run the unsubscribe function when the component unmounts.
		return unsubsribe;
	}, []);

	// Return the Provider component, which provides children access to the state and state setter methods.
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
