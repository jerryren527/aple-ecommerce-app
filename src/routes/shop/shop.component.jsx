import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import Category from "../../components/category/category.component";
import { Route, Routes } from "react-router-dom";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const Shop = () => {
	return (
		<Routes>
			<Route index element={<CategoryPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
