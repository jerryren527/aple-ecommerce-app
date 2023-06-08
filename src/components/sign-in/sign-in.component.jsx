import { useState } from "react";
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignIn = () => {
	const navigate = useNavigate();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		navigate("/");
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("submited");

		try {
			await signInAuthUserWithEmailAndPassword(email, password);
			setFormFields(defaultFormFields);
			navigate("/");
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("incorrect password for email");
					break;
				case "auth/user-not-found":
					alert("no user associated with this email");
					break;
				default:
					console.log(error);
			}
		}
	};

	return (
		<div>
			<Box
				sx={{
					marginBottom: `10px`,
				}}
			>
				<Typography variant="h4" component="h2">
					SIGN IN
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
						id="email-input"
						label="Email"
						variant="outlined"
						name="email"
						onChange={handleChange}
						value={email}
						fullWidth
					/>
				</Box>
				<Box>
					<TextField
						type="password"
						id="password-input"
						label="Password"
						variant="outlined"
						name="password"
						onChange={handleChange}
						value={password}
						fullWidth
					/>
				</Box>
				<Stack direction="row" spacing={2}>
					<Button variant="contained" type="submit">
						SIGN IN
					</Button>
					<Button variant="contained" type="button" onClick={signInWithGoogle}>
						SIGN IN WITH GOOGLE
					</Button>
				</Stack>
			</Box>
		</div>
	);
};

export default SignIn;
