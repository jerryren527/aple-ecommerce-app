import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

import { currencyFormatter } from "../../utils/currency-formatter";
import CartItem from "../cart-item/cart-item.component";

const Cart = () => {
	const { cartItems, cartTotal, clearCart } = useContext(CartContext);

	const handleClick = () => {
		alert("Thank you for submitting your order!")
		clearCart();
	}
	return (
		<Box p={2.5}>
			<h1>CART PAGE</h1>
			<TableContainer component={Paper} elevation={3}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center">Price</TableCell>
							<TableCell align="center">Color</TableCell>
							<TableCell align="center">Storage</TableCell>
							<TableCell align="center">Quantity</TableCell>
							<TableCell align="center">Image</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{cartItems && cartItems.map((item) => <CartItem item={item} />)}</TableBody>
				</Table>
			</TableContainer>
			<Box
				sx={{
					float: `right`,
					marginRight: `10px`,
				}}
			>
				<Typography variant="h4" component="p">
					Total: {currencyFormatter.format(cartTotal)}
				</Typography>
				<Box>
					<Button variant="contained" onClick={handleClick}>Submit Order</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Cart;
