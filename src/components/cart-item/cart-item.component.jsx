import { useContext } from "react";
import { CartContext, addCartItem } from "../../contexts/cart.context";
import {
	Box,
	TableCell,
	TableRow,
} from "@mui/material";

import { currencyFormatter } from "../../utils/currency-formatter";

const CartItem = ({ item }) => {
	const { cartItems, cartCount, cartTotal, addItemToCart, removeItemFromCart } = useContext(CartContext);

	const handleDecrement = (item) => {
		console.log("dcrement");
		console.log("item", item);
		removeItemFromCart(item);
	};

	const handleIncrement = (item) => {
		console.log("increment");
		console.log("item", item);
		addItemToCart(item);
	};
	return (
		<TableRow key={item.id}>
			<TableCell>
				<b>{item.name}</b>
			</TableCell>
			<TableCell>${item.price}</TableCell>
			<TableCell>{item.color}</TableCell>
			<TableCell>{item.storage}</TableCell>
			<TableCell>
				<Box sx={{ display: `flex`, justifyContent: `space-around` }}>
					<Box onClick={() => handleDecrement(item)} sx={{ cursor: `pointer` }}>
						&#10094;
					</Box>
					<span>{item.quantity}</span>
					<Box onClick={() => handleIncrement(item)} sx={{ cursor: `pointer` }}>
						&#10095;
					</Box>
				</Box>
			</TableCell>
			<TableCell align="center">
				<img src={`${item.imageUrl}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
			</TableCell>
		</TableRow>
	);
};

export default CartItem;
