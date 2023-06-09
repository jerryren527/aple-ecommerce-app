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
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
	const { addItemToCart } = useContext(CartContext);

	const handleClick = (e) => {
		console.log("clicked");
		console.log(product);
		addItemToCart(product);
	};

	return (
		<>
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
						<Button onClick={handleClick}>Add To Cart</Button>
						<Button>Learn More </Button>
					</CardActions>
				</CardContent>
			</Card>
		</>
	);
};

export default ProductCard;
