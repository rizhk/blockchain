import type { FC } from "react";
import * as React from "react";
import { FormControl, InputLabel, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BankAccount } from "types/bank-account";

type BankAccountProps = {
	onPaymentMethodChange: any;
	error: boolean;
	helperText: string | false | undefined;
	bankAccounts: BankAccount[];
};

export const BankAccountSelector: FC<BankAccountProps> = (props) => {
	const { onPaymentMethodChange, error, helperText, bankAccounts, ...other } =
		props;
	const theme = useTheme();

	const [value, setValue] = React.useState(null);

	const handleChange = (event: {
		target: { value: React.SetStateAction<null> };
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
				label="Receiving bank"
				select
				onChange={handleChange}>
				{bankAccounts.map((bankAccount) => {
					return (
						<MenuItem value={bankAccount.iban}>
							{bankAccount.holder} - {bankAccount.acc_num}
						</MenuItem>
					);
				})}
			</TextField>
		</FormControl>
	);
};
