import { Box, Button, TextField, Typography } from "@mui/material";

const SignIn = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submited");
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
					<TextField type="text" id="email-input" label="Email" variant="outlined" />
				</Box>
				<Box>
					<TextField type="password" id="password-input" label="Password" variant="outlined" />
				</Box>
				<Box>
					<Button variant="contained" type="submit">
						SIGN IN
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default SignIn;
