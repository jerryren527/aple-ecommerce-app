import {
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
import { CartContext } from "../../contexts/cart.context";
import styled from "@emotion/styled";


export const StyledCard = styled(Card)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
}));

export const StyledImage = styled(CardMedia)({
	width: '100%',
	height: '100%',
	objectFit: 'cover'
});


const ProductCard = ({ product }) => {
	const { addItemToCart } = useContext(CartContext);

	const handleClick = (e) => {
		console.log("clicked");
		console.log(product);
		addItemToCart(product);
	};

	return (
		<>
			<StyledCard key={product.id}>
				<StyledImage
					component="img"
					image={product.imageUrl}
				/>
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
					</CardActions>
				</CardContent>
			</StyledCard>
		</>
	);
};

export default ProductCard;
