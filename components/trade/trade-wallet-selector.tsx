import type { FC } from "react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FormControl, InputLabel, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type WalletProps = {
	wallet: string;
};

// export const WalletSelector: FC<{ wallet: string }> = (props) =>
export const WalletSelector = ({ onWalletChange, error, helperText }) => {
	const theme = useTheme();

	const [value, setValue] = React.useState(null);

	const handleChange = (event) => {
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
				label="Receiving Wallet"
				onChange={handleChange}>
				<MenuItem value="0xB77F68Af0B76C825073F89C03b8323E7290C641D">
					Wallet Name DT - 0xB77F68Af0B76C825073F89C03b8323E7290C641D
				</MenuItem>
				<MenuItem value="0xA9545eFe87Ffbb484cc5B101770D1f5F02fC3CA8">
					Wallet Name SM - 0xA9545eFe87Ffbb484cc5B101770D1f5F02fC3CA8
				</MenuItem>
			</TextField>
		</FormControl>
	);
};
