import type { FC } from "react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FormControl, InputLabel, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type WalletProps = {
	onWalletChange: any;
	error: boolean;
	helperText: string;
	wallets: Wallet[];
};

// export const WalletSelector: FC<{ wallet: string }> = (props) =>
export const WalletSelector: FC<WalletProps> = (props) => {
	const { onWalletChange, error, helperText, wallets, ...other } = props;
	const theme = useTheme();

	const [value, setValue] = React.useState(null);

	const handleChange = (event: {
		target: { value: React.SetStateAction<null> };
	}) => {
		setValue(event.target.value);
		onWalletChange(event);
	};

	return (
		<FormControl fullWidth>
			<TextField
				error={error}
				helperText={helperText}
				id="wallet-select"
				value={value}
				select
				label="Select receiving payee"
				onChange={handleChange}>
				{wallets.map((wallet) => {
					return (
						<MenuItem value={wallet.address}>
							{wallet.name} - {wallet.address}
						</MenuItem>
					);
				})}
			</TextField>
		</FormControl>
	);
};
