import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUp = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const [error, setError] = useState(false);
	const [open, setOpen] = useState(false);

	// reason: string generated based on event
	const handleClose = (e, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);

		if (password !== confirmPassword) {
			console.log("passwords do not match");
			setError(true);
			setOpen(true); // open Snackbar
			return;
		}

		// check if user is authenticated
		try {
			// Create the user by calling firebase's createAuthUserWithEmailAndPassword()
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			console.log(user);
			// Pass an additional object as prop that contains the displayName entered by the user. displayName is not provided in the 'user' object returned by createAuthUserWithEmailAndPassword, so we must provide it outselves if we want to use it.
			await createUserDocumentFromAuth(user, { displayName });
			setFormFields(defaultFormFields); // reset form Fields
		} catch (error) {
			console.log(error);
			if ((error.code = "auth/email-already-in-use")) {
				alert("Cannot create user, email already in use");
			} else {
				console.log("user creation encournted an error", error);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div>
			<Box
				sx={{
					marginBottom: `10px`,
				}}
			>
				<Typography variant="h4" component="h2">
					SIGN UP
				</Typography>
			</Box>
			<Box
				component="form"
				sx={{
					display: `flex`,
					flexDirection: `column`,
					rowGap: `10px`,
				}}
				onSubmit={handleSubmit}
			>
				<Box>
					<TextField
						type="text"
						id="display-name-input"
						label="Display Name"
						variant="outlined"
						onChange={handleChange}
						name="displayName"
						value={displayName}
					/>
				</Box>
				<Box>
					<TextField
						type="text"
						id="email-input"
						label="Email"
						variant="outlined"
						onChange={handleChange}
						name="email"
						value={email}
					/>
				</Box>
				<Box>
					<TextField
						error={error}
						type="password"
						id="password-input"
						label="Password"
						variant="outlined"
						onChange={handleChange}
						name="password"
						value={password}
					/>
				</Box>
				<Box>
					<TextField
						error={error}
						type="password"
						id="confirm-password-input"
						label="Confirm Password"
						variant="outlined"
						onChange={handleChange}
						name="confirmPassword"
						value={confirmPassword}
					/>
				</Box>
				<Box>
					<Button variant="contained" type="submit">
						SIGN UP
					</Button>
				</Box>
				<Snackbar message="Error signing up" autoHideDuration={3000} open={open} onClose={handleClose}></Snackbar>
			</Box>
		</div>
	);
};

export default SignUp;
