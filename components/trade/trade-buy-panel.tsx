import type { FC } from "react";
import React, { useRef } from "react";
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
import { BankAccountSelector } from "./trade-payment-method-selector";
import { CryptoSelector } from "./trade-crypto-selector";
import { PicanteReward } from "./trade-picante-reward";
import { WalletSelector } from "./trade-wallet-selector";
import TradePaymentModal from "./buy-steps/trade-payment-modal";
import { TradePaymentLoadingModal } from "./buy-steps/trade-payment-loading-modal";
import { useModal, useLoadingModal } from "../../hooks/use-buy-modal";
import { useWeb3 } from "../../hooks/Web3Client";
import { default as DexContractAbi } from "contracts/PicanteDexAbi.json";
import { BigNumber, ethers, utils } from "ethers";
import { FormatTypes, Interface } from "ethers/lib/utils";
import { exit } from "process";

var tokenAddr = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;
var DexContractAddr = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDRESS;

export const BuyPanel: FC = (props) => {
	const theme = useTheme();
	const { isShowing, toggle } = useModal();
	const { isLoadingShowing, toggleLoading } = useLoadingModal();

	const cref = useRef();

	const { web3Provider, connect, disconnect } = useWeb3();

	const [picanteCharge, setPicanteCharge] = React.useState(0);

	const changePaymentMethod = (event: { target: { value: any } }) => {
		formik.setFieldValue("paymentMethod", event.target.value);
	};

	const changeWallet = (event: { target: { value: any } }) => {
		formik.setFieldValue("receiveWallet", event.target.value);
	};

	const handlePayAmountChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		formik.setFieldValue("amountPay", event.target.value);
		//assumme GBP to USDC is 1:1 for POC
		var picanteChargePercentage = 1;
		var receiveValue =
			(event.target.value * (100 - picanteChargePercentage)) / 100;
		setPicanteCharge((event.target.value * picanteChargePercentage) / 100);
		formik.setFieldValue("amountReceive", receiveValue);
	};

	const callCreatePaymentToken = (cref) => {
		cref.current.callCreatePaymentToken();
	};

	const formik = useFormik({
		initialValues: {
			amountPay: undefined,
			amountReceive: 0,
			amountReward: 0,
			paymentMethod: undefined,
			receiveWallet: undefined,
			submit: null,
		},
		validationSchema: Yup.object({
			amountPay: Yup.number().required("Amount Pay is required"),
			// paymentMethod: Yup.string().required("Select a payment method"),
			receiveWallet: Yup.string().required("Select a wallet"),
		}),
		onSubmit: async (values, helpers): Promise<void> => {
			try {
				// return;
				const that = this;
				const signer = web3Provider.getSigner();

				const iface = new Interface(DexContractAbi);
				var abi = iface.format(FormatTypes.full);

				const myDexContract = new ethers.Contract(
					DexContractAddr,
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

				var result = null;
				result = await myDexContract.buy(
					BigNumber.from(
						(values.amountReceive * 10 ** 18).toString()
					),
					options
				);

				// var address = await signer.getAddress();
				// console.log(result);
				console.log(result.hash);
				if (result.hash) {
					console.log("waiting transaction complete in blockchain");
					console.log("loading screen on");
					toggleLoading();
					let txn = await web3Provider.waitForTransaction(
						result.hash
					);
					console.log("transaction is completed");
					if (txn) {
						if (txn.blockNumber) {
							callCreatePaymentToken(cref);
							toggleLoading();
							toggle();
							console.log("switch to payment screen");
						}
					}
				}
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
					Buy Crypto
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
			<TradePaymentModal isShowing={isShowing} hide={toggle} ref={cref} />
			<TradePaymentLoadingModal
				isLoadingShowing={isLoadingShowing}
				hide={toggleLoading}
			/>
			<Grid container spacing={0.5} mb={3}>
				<Grid item md={8} xs={8}>
					<TextField
						error={Boolean(
							formik.touched.amountPay && formik.errors.amountPay
						)}
						helperText={
							formik.touched.amountPay && formik.errors.amountPay
						}
						fullWidth
						id="buy-form-pay"
						label="You Pay"
						variant="outlined"
						value={formik.values.amountPay}
						type="number"
						inputProps={{
							maxLength: 13,
							step: "1",
						}}
						onChange={(e) => {
							handlePayAmountChange(e);
						}}
					/>
				</Grid>
				<Grid item md={4} xs={4}>
					<FiatSelector />
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
			<Typography variant="subtitle1" mt={3} mb={3}>
				&#163;{picanteCharge} - 1% Estimated Fees
			</Typography>
			<Grid container spacing={0.5} mb={3}>
				<Grid item md={8} xs={8}>
					<TextField
						fullWidth
						id="buy-form-amount-receive"
						label="You Receive (estimated)"
						disabled={true}
						type="number"
						inputProps={{
							maxLength: 13,
							step: "0.000000000000000001",
						}}
						value={formik.values.amountReceive}
					/>
				</Grid>
				<Grid item md={4} xs={4}>
					<CryptoSelector />
				</Grid>
			</Grid>
			<Grid container spacing={0.5} mb={3}>
				<Grid item md={8} xs={8}>
					<TextField
						fullWidth
						id="buy-form-amount-reward"
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
					<WalletSelector
						error={Boolean(
							formik.touched.receiveWallet &&
								formik.errors.receiveWallet
						)}
						helperText={
							formik.touched.receiveWallet &&
							formik.errors.receiveWallet
						}
						onWalletChange={changeWallet}
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
