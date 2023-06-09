import { Routes, Route } from "react-router-dom";

import Categories from "./routes/categories/categories.component";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import MyButton from "./components/my-button/my-button.component";
import Settings from "./routes/settings/settings.component";
import Shop from "./routes/shop/shop.component";

const Home = () => {
	return (
		<div>
			<h1>HOME PAGE</h1>
			<MyButton />
		</div>
	);
};

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Categories />} />
				<Route path="home" element={<Home />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="settings" element={<Settings />} />
				<Route path="shop/*" element={<Shop />} />
			</Route>
		</Routes>
	);
};

export default App;
