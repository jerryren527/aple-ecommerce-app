import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CategoriesProvider } from "./contexts/categories.context";

import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./contexts/user.context";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { CartProvider } from "./contexts/cart.context";

// https://mui.com/material-ui/customization/typography/#responsive-font-sizes
let theme = createTheme();
theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<CssBaseline enableColorScheme />
		<BrowserRouter>
			<CategoriesProvider>
				<UserProvider>
					<CartProvider>
						<ThemeProvider theme={theme}>
							<App />
						</ThemeProvider>
					</CartProvider>
				</UserProvider>
			</CategoriesProvider>
		</BrowserRouter>
	</React.StrictMode>
);
