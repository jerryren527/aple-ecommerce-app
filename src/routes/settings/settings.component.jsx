import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

const Settings = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<Box
			sx={{
				padding: `20px`,
			}}
		>
			<Typography variant="h3">SETTINGS</Typography>
			<Typography variant="h6" component="h4">
				Email: {currentUser && currentUser.email}{" "}
			</Typography>
			<Typography variant="h6" component="h4">
				Created On: {currentUser && currentUser.metadata.creationTime}{" "}
			</Typography>
		</Box>
	);
};

export default Settings;
