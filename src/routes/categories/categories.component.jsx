import { SHOP_DATA } from "../../shop-data";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { Box, Card, CardContent, CardMedia, List, ListItem, ListItemText, Typography } from "@mui/material";

const Categories = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	console.log(categoriesMap);
	console.log(Object.keys(categoriesMap));
	return (
		<Box
			sx={{
				padding: `10px`,
			}}
		>
			{categoriesMap &&
				Object.keys(categoriesMap).map((category) => (
					<>
						<Typography variant="h3" component="h2">
							{category}
						</Typography>
						<Box
							sx={{
								display: `flex`,
								columnGap: `10px`,
								marginBottom: `20px`,
							}}
						>
							{categoriesMap[category].map((product) => (
								<Box
									sx={{
										height: `auto`,
										width: {
											xs: 100,
											sm: 200,
											md: 300,
										},
									}}
								>
									<Card key={product.id}>
										<CardMedia component="img" image={product.imageUrl} />
										<CardContent>
											<Typography variant="h6" component="div" gutterBottom>
												{product.name}
											</Typography>
											<List>
												<ListItem>
													<ListItemText primary={`Price: ${product.price}`} />
												</ListItem>
												<ListItem>
													<ListItemText primary={`Color: ${product.color}`} />
												</ListItem>
												<ListItem>
													<ListItemText primary={`Storage: ${product.storage}`} />
												</ListItem>
											</List>
										</CardContent>
									</Card>
								</Box>
							))}
						</Box>
					</>
				))}
		</Box>
	);
};

export default Categories;

{
	/* <p>{product.category}</p>
									<p>{product.price}</p>
									<p>{product.color}</p>
									<p>{product.storage}</p> */
}
