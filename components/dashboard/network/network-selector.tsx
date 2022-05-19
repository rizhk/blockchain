import type { FC } from "react";
import * as React from "react";
import { FormControl, InputLabel, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const NetworkSelector = ({ onNetworkChange, error, helperText }) => {
	const theme = useTheme();

	const [value, setValue] = React.useState("80001");

	const handleChange = (event) => {
		setValue(event.target.value);
		onNetworkChange(event);
	};

	return (
		<FormControl
			fullWidth
			sx={{
				mt: 2,
				mb: 2,
			}}>
			<TextField
				error={error}
				helperText={helperText}
				id="network-select"
				value={value}
				label="Blockchain network"
				select
				onChange={handleChange}>
				<MenuItem value="80001" selected={true}>
					Polygon network
				</MenuItem>
			</TextField>
		</FormControl>
	);
};
