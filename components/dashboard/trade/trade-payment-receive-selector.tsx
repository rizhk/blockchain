import type { FC } from "react";
import * as React from "react";
import { FormControl, InputLabel, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const BankAccountSelector = ({
	onPaymentMethodChange,
	error,
	helperText,
}) => {
	const theme = useTheme();

	const [value, setValue] = React.useState(1);

	const handleChange = (event: {
		target: { value: React.SetStateAction<number> };
	}) => {
		setValue(event.target.value);
		onPaymentMethodChange(event);
	};

	return (
		<FormControl fullWidth>
			<TextField
				error={error}
				helperText={helperText}
				id="payment-receive-select"
				value={value}
				label="Receive Payment In"
				select
				onChange={handleChange}>
				<MenuItem value="1">
					HSBC - Anika Visser - 400515 - 12345674
				</MenuItem>
			</TextField>
		</FormControl>
	);
};
