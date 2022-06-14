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

	const [value, setValue] = React.useState("plaid");

	const handleChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setValue(event.target.value);
		onPaymentMethodChange(event);
	};

	return (
		<FormControl fullWidth>
			<TextField
				error={error}
				helperText={helperText}
				id="payment-method-select"
				value={value}
				label="Payment Method"
				select
				onChange={handleChange}>
				<MenuItem value="plaid" key="plaid" selected={true}>
					Bank Transfer with Plaid
				</MenuItem>
			</TextField>
		</FormControl>
	);
};
