import {
	Box,
	Grid,
	Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../product-cart/product-card.compoent";

const Category = () => {
	const { category } = useParams(); // use useParams() hook to access url parameters
	const { categoriesMap } = useContext(CategoriesContext);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<Box p={2.5}>
			<Typography variant="h3">{category}</Typography>
			<Grid container spacing={{ xs: 1, sm: 2, md: 3 }} p={{ xs: 1, sm: 2, md: 3 }}>
				{products &&
					products.map((product, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<ProductCard product={product} />
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default Category;
