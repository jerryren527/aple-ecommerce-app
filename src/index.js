import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CategoriesProvider } from "./contexts/categories.context";

import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

// CssBaseline for a global reset, for a consistent look.
// enableColorScheme allows for switching between 'light' and 'dark' modes of naative compoennts, like scrollbar.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<CssBaseline enableColorScheme />
		<BrowserRouter>
			<CategoriesProvider>
				<App />
			</CategoriesProvider>
		</BrowserRouter>
	</React.StrictMode>
);
