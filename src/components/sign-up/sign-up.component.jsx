import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

const ERROR_MESSAGE_TYPES = {
	PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
	EMAIL_ALREADY_IN_USE: "Email is already in use",
};

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUp = () => {
	const navigate = useNavigate();

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const [errorMessage, setErrorMessage] = useState(null);
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
		setErrorMessage(null);

		if (password !== confirmPassword) {
			setErrorMessage(ERROR_MESSAGE_TYPES.PASSWORDS_DO_NOT_MATCH);
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
			navigate("/");
		} catch (error) {
			console.log(error);
			if ((error.code = "auth/email-already-in-use")) {
				setErrorMessage(ERROR_MESSAGE_TYPES.EMAIL_ALREADY_IN_USE);
				setOpen(true);
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
						error={errorMessage === ERROR_MESSAGE_TYPES.EMAIL_ALREADY_IN_USE}
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
						error={errorMessage === ERROR_MESSAGE_TYPES.PASSWORDS_DO_NOT_MATCH}
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
						error={errorMessage === ERROR_MESSAGE_TYPES.PASSWORDS_DO_NOT_MATCH}
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
				<Snackbar
					message={errorMessage && errorMessage}
					autoHideDuration={3000}
					open={open}
					onClose={handleClose}
				></Snackbar>
			</Box>
		</div>
	);
};

export default SignUp;
