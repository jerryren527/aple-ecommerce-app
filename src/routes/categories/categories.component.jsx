import { SHOP_DATA } from "../../shop-data";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	ImageList,
	ImageListItem,
	List,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import Category from "../../components/category/category.component";
import { Link } from "react-router-dom";
import { CustomizedLink } from "../navigation/navigation.component";

const imageList = [
	{ imageUrl: "https://picsum.photos/200", title: "phones" },
	{ imageUrl: "https://picsum.photos/200", title: "laptops" },
	{ imageUrl: "https://picsum.photos/200", title: "desktops" },
	{ imageUrl: "https://picsum.photos/200", title: "tablets" },
	{ imageUrl: "https://picsum.photos/200", title: "headphones" },
	{ imageUrl: "https://picsum.photos/200", title: "tvs" },
	{ imageUrl: "https://picsum.photos/200", title: "watches" },
	{ imageUrl: "https://picsum.photos/200", title: "speakers" },
	{ imageUrl: "https://picsum.photos/200", title: "accessories" },
];

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
			<Grid container spacing={{ xs: 1, sm: 2, md: 3 }} p={{ xs: 1, sm: 2, md: 3 }}>
				{imageList.map((item) => (
					<Grid item xs={6} sm={4} md={3}>
						<CustomizedLink to={`shop/${item.title}`}>
							<Card key={item.title}>
								<CardMedia component="img" image={item.imageUrl} />
								<CardContent>
									<Typography variant="h6" component="div" gutterBottom>
										{item.title}
									</Typography>
								</CardContent>
							</Card>
						</CustomizedLink>
					</Grid>
				))}
			</Grid>

			{categoriesMap &&
				Object.keys(categoriesMap).map((category) => (
					<>
						<Category category={category} categoryProducts={categoriesMap[category]} />
					</>
				))}
		</Box>
	);
};

export default Categories;
