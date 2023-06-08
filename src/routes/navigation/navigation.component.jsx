import { Outlet } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Apple, CatchingPokemon, KeyboardArrowDown } from "@mui/icons-material";
import styled from "@emotion/styled";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const MENU_ITEMS = {
	SETTINGS: "SETTINGS",
	SIGN_OUT: "SIGN OUT",
};

const CustomizedLink = styled(Link)`
	text-decoration: none;
	color: #fff;
`;

const Navigation = () => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const { currentUser } = useContext(UserContext);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget); // set the CustomizedLink element as the current element
	};

	const handleClose = () => {
		setAnchorEl(null); // hides the menu
	};

	const handleMenuItemClick = async (e) => {
		const innerText = e.target.innerText;
		switch (innerText) {
			case MENU_ITEMS.SETTINGS:
				navigate("/settings");
				break;
			case MENU_ITEMS.SIGN_OUT:
				await signOutUser();
				navigate("/");
				break;
			default:
				break;
		}
		setAnchorEl(null); // hides the menu
	};

	console.log("currentUser", currentUser);
	return (
		<>
			<AppBar position="static">
				<Toolbar sx={{ alignItems: `center` }}>
					<CustomizedLink to="/">
						<IconButton size="large" edge="start" color="inherit" aria-label="logo" disableRipple>
							<Apple />
						</IconButton>
					</CustomizedLink>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						APPLE STORE
					</Typography>
					<Stack direction="row" spacing={2}>
						<CustomizedLink to="/">HOME</CustomizedLink>
						{currentUser ? (
							<CustomizedLink
								id="user__button"
								onClick={handleClick}
								aria-control={open ? "user__menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<Box
									sx={{
										display: `flex`,
										alignItems: `center`,
									}}
								>
									{currentUser.email}
									<KeyboardArrowDown />
								</Box>
							</CustomizedLink>
						) : (
							<CustomizedLink to="/auth">SIGN IN</CustomizedLink>
						)}
					</Stack>
					<Menu
						id="user__menu"
						anchorEl={anchorEl}
						open={open}
						MenuListProps={{
							"aria-labelled": "user__button",
						}}
						onClose={handleClose}
					>
						<MenuItem onClick={handleMenuItemClick}>SETTINGS</MenuItem>
						<MenuItem onClick={handleMenuItemClick}>SIGN OUT</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<Outlet />
		</>
	);
};

// to="/" onClick={signOutUser}
// the onClick handler on user__button will set it as the anchor element of the menu
export default Navigation;
