import type { FC } from "react";
import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const PicanteReward: FC = (props) => {
	const theme = useTheme();

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<FormControl fullWidth>
			<Select
				id="crypto-select"
				value="PIC"
				onChange={handleChange}
				disabled>
				<MenuItem value={"PIC"}>PIC</MenuItem>
			</Select>
		</FormControl>
	);
};
