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
	Typography,
} from "@mui/material";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../product-cart/product-card.compoent";

const CategoryPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<Box
			sx={{
				padding: `15px`,
			}}
		>
			{categoriesMap &&
				Object.keys(categoriesMap).map((category) => (
					<>
						<Box sx={{ textAlign: `center` }}>
							<Typography variant="h3" component="h2">
								{category}
							</Typography>
						</Box>
						<Box
							sx={{
								display: `flex`,
								flexWrap: `wrap`,
								columnGap: `10px`,
								marginBottom: `25px`,
								justifyContent: `center`,
							}}
						>
							{categoriesMap[category].map((product) => (
								<Box
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
						</Box>
					</>
				))}
		</Box>
	);
};

export default CategoryPreview;
