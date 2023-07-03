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

const imageList = [
	{ imageUrl: "https://i.imgur.com/feFijXF.jpg", title: "phones" },
	{ imageUrl: "https://i.imgur.com/jPwsSQa.jpg", title: "laptops" },
	{ imageUrl: "https://i.imgur.com/5tYUtRy.jpg", title: "desktops" },
	{ imageUrl: "https://i.imgur.com/Ot1EXeQ.jpg", title: "tablets" },
	{ imageUrl: "https://i.imgur.com/eJIicqK.jpg", title: "headphones" },
	{ imageUrl: "https://i.imgur.com/ER0LSMg.jpg", title: "tvs" },
	{ imageUrl: "https://i.imgur.com/QamOKth.jpg", title: "watches" },
	{ imageUrl: "https://i.imgur.com/Ir4DaT8.jpg", title: "speakers" },
	{ imageUrl: "https://i.imgur.com/KRgUUn2.jpg", title: "accessories" },
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
				{imageList.map((item, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<CustomizedLink to={`shop/${item.title}`}>
							<StyledCard
								key={item.title}
							>
								<StyledImage component="img" image={item.imageUrl} />
								<CardContent>
									<Typography variant="h6" component="div" gutterBottom>
										{item.title}
									</Typography>
								</CardContent>
							</StyledCard>
						</CustomizedLink>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Categories;
