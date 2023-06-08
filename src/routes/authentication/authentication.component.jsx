import { Box } from "@mui/system";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const Authentication = () => {
	return (
		<Box
			sx={{
				display: `flex`,
				justifyContent: `center`,
				columnGap: `50px`,
				marginTop: `50px`,
			}}
		>
			<SignIn />
			<SignUp />
		</Box>
	);
};

export default Authentication;
