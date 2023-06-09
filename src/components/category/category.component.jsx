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

const Category = () => {
	const { category } = useParams(); // use useParams() hook to access url parameters
	const { categoriesMap } = useContext(CategoriesContext);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<Box p={10}>
			<Typography variant="h3">{category}</Typography>
			<Stack direction="row" spacing={2}>
				{products &&
					products.map((product) => (
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
			</Stack>
		</Box>
	);
};

export default Category;
