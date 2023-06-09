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

const CategoryPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<>
			{categoriesMap &&
				Object.keys(categoriesMap).map((category) => (
					<>
						<Typography variant="h3" component="h2">
							{category}
						</Typography>
						<Box
							sx={{
								display: `flex`,
								flexWrap: `wrap`,
								columnGap: `10px`,
								marginBottom: `20px`,
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
									<Card key={product.id}>
										<CardMedia component="img" image={product.imageUrl} />
										<CardContent>
											<Typography variant="h6" component="p" gutterBottom>
												{product.name}
											</Typography>
											<List>
												<ListItem>
													<ListItemText primary={`Price: $${product.price}`} />
												</ListItem>
												<ListItem>
													<ListItemText primary={`Color: ${product.color}`} />
												</ListItem>
												<ListItem>
													<ListItemText primary={`Storage: ${product.storage}`} />
												</ListItem>
											</List>
											<CardActions>
												<Button>Add To Cart</Button>
												<Button>Learn More </Button>
											</CardActions>
										</CardContent>
									</Card>
								</Box>
							))}
						</Box>
					</>
				))}
		</>
	);
};

export default CategoryPreview;
