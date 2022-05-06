import type { FC } from "react";
import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactCountryFlag from "react-country-flag";

export const FiatSelector: FC = (props) => {
	const theme = useTheme();

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<FormControl fullWidth>
			<Select
				id="currency-select"
				value="GBP"
				onChange={handleChange}
				disabled>
				<MenuItem value={"GBP"}>
					<ReactCountryFlag
						style={{
							width: "24px",
						}}
						countryCode="GB"
						svg
					/>
					<span
						style={{
							padding: "0 10px",
							height: "24px",
							display: "inline-block",
						}}>
						GBP
					</span>
				</MenuItem>
			</Select>
		</FormControl>
	);
};
