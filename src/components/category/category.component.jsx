import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	List,
	ListItem,
	ListItemText,
	Stack,
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
			<Stack direction="row" sx={{ flexWrap: `wrap`, gap: `15px`, justifyContent: `center` }}>
				{products &&
					products.map((product) => (
						<Box
							key={product.id}
							sx={{
								height: `auto`,
								minWidth: {
									xs: 150,
									sm: 200,
									md: 250,
								},
							}}
						>
							<ProductCard product={product} />
						</Box>
					))}
			</Stack>
		</Box>
	);
};

export default Category;
