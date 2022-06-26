import { FC, useCallback, useEffect, useState } from "react";
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
import { ethers } from "ethers";
import WalletConnectModal from "./trade-wallet-connect-modal";
import GrantPermissionModal from "./sell-steps/grant-permission-modal";
import SendTokenModal from "./sell-steps/send-token-modal";
import TokenTransferedModal from "./sell-steps/token-transfered-modal";
import {
	useSendTokenModal,
	useGrantPermissionModal,
	useTokenTransferedModal,
} from "hooks/use-sell-modal";
import { default as tokenContractAbi } from "contracts/PicanteTokenAbi.json";
import { FormatTypes, Interface } from "ethers/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { bankAccountApi } from "api/bank-account-api";
import { useMounted } from "hooks/use-mounted";
import { BankAccount } from "types/bank-account";
import { sellOfferApi } from "api/market-sell-offer-api";
import { transactionApi } from "api/transaction-api";
import { ConsoleLogger } from "@aws-amplify/core";

const tokenAddr = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!;
const DexContractAddr = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDRESS!;

export const SellPanel: FC = (props) => {
	const theme = useTheme();
	const isMounted = useMounted();

	var picanteChargePercentage = 0.1;

	const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

	const updateBankAccounts = (bankAccounts: any): void => {
		setBankAccounts(bankAccounts);
	};

	const getBankAccounts = useCallback(async () => {
		try {
			const data = await bankAccountApi.getItems();

			if (isMounted()) {
				setBankAccounts(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	useEffect(
		() => {
			getBankAccounts();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const { isWalletConnectShowing, toggleWalletConnect } =
		useWalletConnectModal();

	const { isGrantPermissionShowing, toggleGrantPermission } =
		useGrantPermissionModal();

	const { isSendTokenShowing, toggleSendToken } = useSendTokenModal();

	const { isTokenTransferedShowing, toggleTokenTransfered } =
		useTokenTransferedModal();

	const { web3Provider, connect } = useWeb3();

	const [picanteCharge, setPicanteCharge] = React.useState(0);

	const changePaymentMethod = (event: { target: { value: any } }) => {
		formik.setFieldValue("paymentMethod", event.target.value);
	};

	// const changeWallet = (event: { target: { value: any } }) => {
	// 	formik.setFieldValue("receiveWallet", event.target.value);
	// };

	const handlePayAmountChange = (event: any) => {
		formik.setFieldValue("amountToSell", event.target.value);
		//assumme GBP to USDC is 1:125 for POC
		var receiveValue =
			(event.target.value * (100 - picanteChargePercentage)) / 100 / 1.25;
		setPicanteCharge((event.target.value * picanteChargePercentage) / 100);
		formik.setFieldValue("amountReceive", receiveValue);

		formik.setFieldValue("amountReward", 1);
	};

	const formik = useFormik({
		initialValues: {
			amountToSell: undefined!,
			amountReceive: 0,
			amountReward: 0,
			amountApprove: 0,
			paymentMethod: "",
			submit: null,
		},
		validationSchema: Yup.object({
			amountToSell: Yup.number().required("Amount to sell is required"),
			paymentMethod: Yup.string().required("Select a payment method"),
		}),
		onSubmit: async (values, helpers): Promise<void> => {
			try {
				let provider = web3Provider;
				if (provider == null) {
					toggleWalletConnect();
					provider = await connect();
					toggleWalletConnect();
				}

				toggleGrantPermission();
				const signer = await provider.getSigner();
				const iface = new Interface(tokenContractAbi);
				var abi = iface.format(FormatTypes.full);

				//Create offer before initial polygon transaction
				// submit offer to backend
				let offerId = await sellOfferApi.create({
					wallet_addr: await signer.getAddress(),
					buy_gem: "GBP",
					pay_gem: tokenAddr,
					pay_gem_total: formik.values.amountToSell,
					receiving_bank_id: formik.values.paymentMethod,
					network_id: "80001",
				});

				console.log(offerId);
				const myTokenContract = new ethers.Contract(
					tokenAddr,
					abi,
					signer
				);
				//if approved amount is not matched with form amount, require approve
				let amt = formik.values.amountToSell.toString();
				let amountToSellInWei = ethers.utils.parseUnits(amt, "ether");
				console.log(amountToSellInWei);

				var transfer = await myTokenContract.transfer(
					DexContractAddr,
					amountToSellInWei
				);

				console.log(transfer);
				if (transfer.hash) {
					//pass has to backend
					let txnId = await transactionApi.createSellTxn({
						offer_id: offerId,
						txn_hash: transfer.hash,
					});
					console.log(txnId);
					console.log("waiting transfer complete");
					toggleGrantPermission();
					toggleSendToken();

					let txn = await provider.waitForTransaction(transfer.hash);
					console.log("transfer is completed");
					if (txn) {
						if (txn.blockNumber) {
							toggleSendToken();
							toggleTokenTransfered();
							console.log("Transfer success");
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
			<SendTokenModal
				isSendTokenShowing={isSendTokenShowing}
				hide={isSendTokenShowing}
			/>
			<TokenTransferedModal
				isTokenTransferedShowing={isTokenTransferedShowing}
				hide={isTokenTransferedShowing}
			/>
			<Grid container spacing={2.5} mb={2.5}>
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
			<Grid
				container
				spacing={2.5}
				mb={2.5}
				sx={{ marginLeft: "0px", marginTop: "5px" }}>
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
						&nbsp;&nbsp;&#163;{picanteCharge} USDC - 0.1% Estimated
						Fees
						<br />
						<Typography variant="caption" color="neutral.400">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#163;1
							GBP = 1.25 USDC (Estimated)
						</Typography>
					</span>
				</Typography>
			</Grid>
			<Grid container spacing={2.5} mb={2.5}>
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
			<Grid container spacing={2.5} mb={2.5}>
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
			<Grid container spacing={2.5}>
				<Grid item md={12} xs={12}>
					<BankAccountSelector
						bankAccounts={bankAccounts}
						parentCallback={updateBankAccounts}
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
					type="submit">
					Sell now
				</Button>
			</Box>
		</form>
	);
};
