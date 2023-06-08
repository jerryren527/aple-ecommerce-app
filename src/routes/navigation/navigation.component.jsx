import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { Apple, CatchingPokemon } from "@mui/icons-material";
import styled from "@emotion/styled";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const CustomizedLink = styled(Link)`
	text-decoration: none;
	color: #fff;
`;

const Navigation = () => {
	const { currentUser } = useContext(UserContext);

	console.log("currentUser", currentUser);
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="logo">
						<Apple />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						APPLE STORE
					</Typography>
					<Stack direction="row" spacing={2}>
						<CustomizedLink to="/">HOME</CustomizedLink>
						{currentUser ? (
							<CustomizedLink to="/" onClick={signOutUser}>
								SIGN OUT
							</CustomizedLink>
						) : (
							<CustomizedLink to="/auth">SIGN IN</CustomizedLink>
						)}
					</Stack>
				</Toolbar>
			</AppBar>
			<Outlet />
		</>
	);
};

{
	/* // <ul className="navigation__container__links">
			// 	<li>
			// 		<Link to="/">HOME</Link>
			// 	</li>
			// 	<li>
			// 		<Link to="/home">Home page actually</Link>
			// 	</li>
			// 	<li>
			// 		<Link to="/auth">SIGN IN</Link>
			// 	</li>
			// </ul> */
}
export default Navigation;
