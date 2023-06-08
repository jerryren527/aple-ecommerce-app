import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomizedButton = styled(Button)`
	background-color: red;

	:hover {
		background-color: yellow;
	}
`;

export default function MyButton() {
	return (
		<div>
			<Button variant="contained">Hello World</Button>
			<CustomizedButton variant="contained">Hello World</CustomizedButton>
		</div>
	);
}
