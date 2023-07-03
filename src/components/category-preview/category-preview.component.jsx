import {
	Box,
	Grid,
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
					<Grid container spacing={{ xs: 1, sm: 2, md: 3 }} p={{ xs: 1, sm: 2, md: 3 }}>
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
								justifyContent: `flex-start`,
							}}
						>
							{categoriesMap[category].map((product, index) => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
									<ProductCard product={product} />
								</Grid>
							))}
						</Box>
					</Grid>
				))}
		</Box>
	);
};

export default CategoryPreview;
