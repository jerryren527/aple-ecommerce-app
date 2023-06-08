import { Routes, Route } from "react-router-dom";

import Categories from "./routes/categories/categories.component";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import MyButton from "./components/my-button/my-button.component";

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
				<Route path="/home" element={<Home />} />
				<Route path="/auth" element={<Authentication />} />
			</Route>
		</Routes>
	);
};

export default App;
