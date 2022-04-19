import type { FC } from "react";
import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
	Box,
	Button,
	FormHelperText,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FiatSelector } from "./trade-fiat-selector";
import { BankAccountSelector } from "./trade-payment-receive-selector";
import { CryptoSelector } from "./trade-crypto-selector";
import { PicanteReward } from "./trade-picante-reward";
import { useWeb3 } from "../../hooks/Web3Client";
import { default as tokenContractAbi } from "contracts/PicanteTokenAbi.json";
import { BigNumber, ethers, utils } from "ethers";
import { FormatTypes, Interface } from "ethers/lib/utils";

var tokenAddr = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;
var DexContractAddr = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDRESS;

export const SellPanel: FC = (props) => {
	const theme = useTheme();

	const { web3Provider, connect, disconnect } = useWeb3();

	const [picanteCharge, setPicanteCharge] = React.useState(0);

	const changePaymentMethod = (event) => {
		formik.setFieldValue("paymentMethod", event.target.value);
	};

	const changeWallet = (event) => {
		formik.setFieldValue("receiveWallet", event.target.value);
	};

	const handlePayAmountChange = (event) => {
		formik.setFieldValue("amountToSell", event.target.value);
		console.log(event.target.value);
		//assumme GBP to USDC is 1:1 for POC
		var picanteChargePercentage = 1;
		var receiveValue =
			(event.target.value * (100 - picanteChargePercentage)) / 100;
		setPicanteCharge((event.target.value * picanteChargePercentage) / 100);
		formik.setFieldValue("amountReceive", receiveValue);
	};

	const formik = useFormik({
		initialValues: {
			amountToSell: undefined,
			amountReceive: 0,
			amountReward: 0,
			paymentMethod: undefined,
			submit: null,
		},
		validationSchema: Yup.object({
			amountToSell: Yup.number().required("Amount to sell is required"),
			paymentMethod: Yup.string().required("Select a payment method"),
		}),
		onSubmit: async (values, helpers): Promise<void> => {
			try {
				const signer = web3Provider.getSigner();

				const iface = new Interface(tokenContractAbi);
				var abi = iface.format(FormatTypes.full);

				const myTokenContract = new ethers.Contract(
					tokenAddr,
					abi,
					signer
				);

				var gasEstimatedPrice = await web3Provider.getFeeData();

				var fee = Math.ceil(gasEstimatedPrice.gasPrice);

				var options = {
					gasLimit: 7920027,
					maxFeePerGas: fee * 20,
					maxPriorityFeePerGas: fee * 20,
				};

				var result = await myTokenContract.transfer(
					DexContractAddr,
					BigNumber.from((values.amountToSell * 10 ** 18).toString()),
					options
				);

				console.log(result);
			} catch (err) {
				console.error(err);
				// if (isMounted()) {
				// 	helpers.setStatus({ success: false });
				// 	helpers.setErrors({ submit: err.message });
				// 	helpers.setSubmitting(false);
				// }
			}
		},
	});

	let button;

	if (web3Provider) {
		button = (
			<Box sx={{ mt: 2 }}>
				<Button
					fullWidth
					size="large"
					variant="contained"
					type="submit">
					Sell Crypto
				</Button>
				<button onClick={disconnect}>Disconnect</button>
			</Box>
		);
	} else {
		button = (
			<Box sx={{ mt: 2 }}>
				<Button
					fullWidth
					size="large"
					variant="contained"
					type="submit"
					onClick={connect}>
					Connect
				</Button>
			</Box>
		);
	}

	return (
		<form noValidate onSubmit={formik.handleSubmit} {...props}>
			<Grid container spacing={0.5} mb={3}>
				<Grid item md={8} xs={8}>
					<TextField
						error={Boolean(
							formik.touched.amountToSell &&
								formik.errors.amountToSell
						)}
						helperText={
							formik.touched.amountToSell &&
							formik.errors.amountToSell
						}
						fullWidth
						id="sell-form-amount-receive"
						label="You Sell"
						type="number"
						inputProps={{
							maxLength: 13,
							step: "0.000000000000000001",
						}}
						value={formik.values.amountToSell}
						onChange={(e) => {
							handlePayAmountChange(e);
						}}
					/>
				</Grid>
				<Grid item md={4} xs={4}>
					<CryptoSelector />
				</Grid>
			</Grid>
			<Typography variant="subtitle1" mt={3} mb={3}>
				&#163;{picanteCharge} - 1% Estimated Fees
			</Typography>
			<Grid container spacing={0.5} mb={3}>
				<Grid item md={8} xs={8}>
					<TextField
						fullWidth
						id="sell-form-pay"
						label="You Received (estimated)"
						variant="outlined"
						value={formik.values.amountReceive}
						type="number"
						disabled={true}
						inputProps={{
							maxLength: 13,
							step: "0.01",
						}}
					/>
				</Grid>
				<Grid item md={4} xs={4}>
					<FiatSelector />
				</Grid>
			</Grid>
			<Grid container spacing={0.5} mb={3}>
				<Grid item md={8} xs={8}>
					<TextField
						fullWidth
						id="sell-form-amount-reward"
						label="Reward (Picante Token)"
						variant="outlined"
						disabled={true}
						value={formik.values.amountReward}
					/>
				</Grid>
				<Grid item md={4} xs={4}>
					<PicanteReward />
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				<Grid item md={12} xs={12}>
					<BankAccountSelector
						error={Boolean(
							formik.touched.paymentMethod &&
								formik.errors.paymentMethod
						)}
						helperText={
							formik.touched.paymentMethod &&
							formik.errors.paymentMethod
						}
						onPaymentMethodChange={changePaymentMethod}
					/>
				</Grid>
			</Grid>
			{formik.errors.submit && (
				<Box sx={{ mt: 3 }}>
					<FormHelperText error>
						{formik.errors.submit}
					</FormHelperText>
				</Box>
			)}
			{button}
		</form>
	);
};
