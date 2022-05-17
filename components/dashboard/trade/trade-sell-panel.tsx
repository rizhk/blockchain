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
import { useWeb3, useWalletConnectModal } from "hooks/Web3Client";
import WalletConnectModal from "./trade-wallet-connect-modal";
import GrantPermissionModal from "./sell-steps/grant-permission-modal";
import GrantingPermissionModal from "./sell-steps/granting-permission-modal";
import PermissionGrantedModal from "./sell-steps/permission-granted-modal";
import SendTokenModal from "./sell-steps/send-token-modal";
import TokenTransferedModal from "./sell-steps/token-transfered-modal";
import {
	useSendTokenModal,
	usePermissionGrantedModal,
	useGrantingPermissionModal,
	useGrantPermissionModal,
	useTokenTransferedModal,
} from "hooks/use-sell-modal";
import { default as tokenContractAbi } from "contracts/PicanteTokenAbi.json";
import { default as DexContractAbi } from "contracts/PicanteDexAbi.json";
import { ethers } from "ethers";
import { FormatTypes, Interface } from "ethers/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

const tokenAddr = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!;
const DexContractAddr = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDRESS!;

export const SellPanel: FC = (props) => {
	const theme = useTheme();

	const { isWalletConnectShowing, toggleWalletConnect } =
		useWalletConnectModal();

	const { isGrantPermissionShowing, toggleGrantPermission } =
		useGrantPermissionModal();

	const { isGrantingPermissionShowing, toggleGrantingPermission } =
		useGrantingPermissionModal();

	const { isPermissionGrantedShowing, togglePermissionGranted } =
		usePermissionGrantedModal();

	const { isSendTokenShowing, toggleSendToken } = useSendTokenModal();

	const { isTokenTransferedShowing, toggleTokenTransfered } =
		useTokenTransferedModal();

	const { web3Provider, connect, disconnect } = useWeb3();

	const [picanteCharge, setPicanteCharge] = React.useState(0);

	const changePaymentMethod = (event: { target: { value: any } }) => {
		formik.setFieldValue("paymentMethod", event.target.value);
	};

	const changeWallet = (event: { target: { value: any } }) => {
		formik.setFieldValue("receiveWallet", event.target.value);
	};

	const handlePayAmountChange = (event: any) => {
		formik.setFieldValue("amountToSell", event.target.value);
		//assumme GBP to USDC is 1:125 for POC
		var picanteChargePercentage = 1;
		var receiveValue =
			(event.target.value * (100 - picanteChargePercentage)) / 100 / 1.25;
		setPicanteCharge((event.target.value * picanteChargePercentage) / 100);
		formik.setFieldValue("amountReceive", receiveValue);
	};

	const placeOfferToDex = async () => {
		let provider = await connect();

		const signer = provider.getSigner();

		const iface = new Interface(DexContractAbi);
		var abi = iface.format(FormatTypes.full);

		const myDexContract = new ethers.Contract(DexContractAddr, abi, signer);

		var result = await myDexContract.placeOffer(
			tokenAddr,
			ethers.utils.parseUnits(formik.values.amountToSell, "ether"),
			"Anika Visser",
			400515,
			12345674,
			"GB24BKEN10000031510604"
		);

		if (result.hash) {
			console.log("waiting placeOffer complete on blockchain");
			togglePermissionGranted();
			toggleSendToken();
			let txn = await provider.waitForTransaction(result.hash);

			if (txn) {
				if (txn.blockNumber) {
					toggleSendToken();
					toggleTokenTransfered();
					console.log("Transfer success");
				}
			}
		}
	};

	const formik = useFormik({
		initialValues: {
			amountToSell: undefined!,
			amountReceive: 0,
			amountReward: 0,
			amountApprove: 0,
			paymentMethod: 1,
			submit: null,
		},
		validationSchema: Yup.object({
			amountToSell: Yup.number().required("Amount to sell is required"),
			paymentMethod: Yup.string().required("Select a payment method"),
		}),
		onSubmit: async (values, helpers): Promise<void> => {
			try {
				let provider = null;
				// Step 1. connect wallet
				if (web3Provider) {
					toggleWalletConnect();

					provider = await connect();

					toggleWalletConnect();
				} else {
					provider = web3Provider;
				}

				console.log(provider);

				toggleGrantPermission();
				const signer = await provider.getSigner();
				const iface = new Interface(tokenContractAbi);
				var abi = iface.format(FormatTypes.full);

				const myTokenContract = new ethers.Contract(
					tokenAddr,
					abi,
					signer
				);
				//if approved amount is not matched with form amount, require approve
				let amountToSellInWei = ethers.utils.parseUnits(
					formik.values.amountToSell,
					"ether"
				);
				console.log(amountToSellInWei);
				var approve = await myTokenContract.approve(
					DexContractAddr,
					amountToSellInWei
				);
				console.log(approve);
				if (approve.hash) {
					console.log("waiting approve complete");
					toggleGrantPermission();
					toggleGrantingPermission();
					let txn = await provider.waitForTransaction(approve.hash);
					console.log("approve is completed");
					if (txn) {
						if (txn.blockNumber) {
							console.log(txn);
							toggleGrantingPermission();
							togglePermissionGranted();
							placeOfferToDex();
						}
					}
				}
			} catch (err) {
				console.error(err);
			}
		},
	});

	return (
		<form noValidate onSubmit={formik.handleSubmit} {...props}>
			<WalletConnectModal
				isWalletConnectShowing={isWalletConnectShowing}
				hide={isWalletConnectShowing}
			/>
			<GrantPermissionModal
				isGrantPermissionShowing={isGrantPermissionShowing}
				hide={isGrantPermissionShowing}
			/>
			<GrantingPermissionModal
				isGrantingPermissionShowing={isGrantingPermissionShowing}
				hide={isGrantingPermissionShowing}
			/>
			<PermissionGrantedModal
				isPermissionGrantedShowing={isPermissionGrantedShowing}
				hide={isPermissionGrantedShowing}
			/>
			<SendTokenModal
				isSendTokenShowing={isSendTokenShowing}
				hide={isSendTokenShowing}
			/>
			<TokenTransferedModal
				isTokenTransferedShowing={isTokenTransferedShowing}
				hide={isTokenTransferedShowing}
			/>
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
						label="Sell"
						type="number"
						inputProps={{
							maxLength: 13,
							step: "0.01",
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
			<Grid container spacing={0.5} mb={3}>
				<LazyLoadImage
					src={process.env.NEXT_PUBLIC_URL + "static/Connector.svg"} // use normal <img> attributes as props
				/>
				<Typography variant="body2" color="neutral.500" mt={3} mb={3}>
					<LazyLoadImage
						width="11.2"
						height="12.8"
						src={
							process.env.NEXT_PUBLIC_URL +
							"static/icons/percentage.svg"
						} // use normal <img> attributes as props
					/>
					<span>
						&nbsp;&nbsp;&#163;{picanteCharge} GBP - 1% Estimated
						Fees
						<br />
						<Typography variant="caption" color="neutral.400">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#163;1
							GBP = 1.25 USDC
						</Typography>
					</span>
				</Typography>
			</Grid>
			<Grid container spacing={0.5} mb={3}>
				<Grid item md={8} xs={8}>
					<TextField
						fullWidth
						id="sell-form-pay"
						label="You receive (estimated)"
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
						label="Rewards (Picante tokens)"
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
			<Box sx={{ mt: 2 }}>
				<Button
					fullWidth
					size="large"
					variant="contained"
					sx={{
						background:
							"linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)",
					}}
					type="submit">
					Sell now
				</Button>
			</Box>
		</form>
	);
};
