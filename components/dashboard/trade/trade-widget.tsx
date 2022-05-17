import type { FC } from "react";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import type { ApexOptions } from "apexcharts";
import PropTypes from "prop-types";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Tabs,
	Tab,
	TextField,
	Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { string } from "prop-types";
import { BuyPanel } from "./trade-buy-panel";
import { SellPanel } from "./trade-sell-panel";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export const TradeWidget: FC = (props) => {
	const theme = useTheme();

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<Card {...props}>
			<CardContent>
				<Box
					sx={{
						width: "100%",
					}}>
					<Tabs
						value={value}
						onChange={handleChange}
						variant="fullWidth"
						aria-label="trade widget tabs">
						<Tab label="Buy crypto" {...a11yProps(0)} />
						<Tab label="Sell crypto" {...a11yProps(1)} />
					</Tabs>
					<SwipeableViews
						axis={theme.direction === "rtl" ? "x-reverse" : "x"}
						index={value}
						onChangeIndex={handleChangeIndex}>
						<TabPanel value={value} index={0}>
							<BuyPanel />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<SellPanel />
						</TabPanel>
					</SwipeableViews>
				</Box>
			</CardContent>
		</Card>
	);
};
