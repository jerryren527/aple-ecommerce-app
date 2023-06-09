import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CategoriesProvider } from "./contexts/categories.context";

import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./contexts/user.context";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";

// https://mui.com/material-ui/customization/typography/#responsive-font-sizes
let theme = createTheme();
theme = responsiveFontSizes(theme);

// CssBaseline for a global reset, for a consistent look.
// enableColorScheme allows for switching between 'light' and 'dark' modes of naative compoennts, like scrollbar.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<CssBaseline enableColorScheme />
		<BrowserRouter>
			<CategoriesProvider>
				<UserProvider>
					<ThemeProvider theme={theme}>
						<App />
					</ThemeProvider>
				</UserProvider>
			</CategoriesProvider>
		</BrowserRouter>
	</React.StrictMode>
);
