import { FC, useCallback, useEffect, useState } from "react";
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
import TradePaymentModal from "./buy-steps/payment-modal";
import { TradeMatchingOfferModal } from "./buy-steps/matching-offer-modal";
import RequestTransferModal from "./buy-steps/request-transfer-modal";
import TokenTransferedModal from "./buy-steps/token-transfered-modal";
import WalletConnectModal from "./buy-steps/wallet-connect-modal";
import ConfirmPurchaseModal from "./buy-steps/confirm-purchase-modal";
import {
	usePaymentModal,
	useMatchingOfferModal,
	useRequestTransferModal,
	useTokenTransferedModal,
	useConfirmPurchaseModal,
} from "hooks/use-buy-modal";
import { useWeb3, useWalletConnectModal } from "hooks/Web3Client";
import { default as DexContractAbi } from "contracts/PicanteDexAbi.json";
import { ethers } from "ethers";
import { FormatTypes, Interface } from "ethers/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PicanteApi } from "api/end-point";
import { walletApi } from "api/wallet-api";
import { useMounted } from "hooks/use-mounted";
import { Wallet } from "types/wallet";

const tokenAddr = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!;
const DexContractAddr = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDRESS!;

export const BuyPanel: FC = (props) => {
	const theme = useTheme();
	const cref = useRef()!;
	const isMounted = useMounted();

	var picanteChargePercentage = 1;

	//payment modal
	const { isPaymentShowing, togglePayment } = usePaymentModal();

	const [txnHash, setTxnHash] = React.useState("");

	const sendPaymentMetaToParent = (transaction: any) => {
		// the callback. Use a better name
		console.log(transaction);
		togglePayment(); //close payment modal
		toggleRequestTransfer();
		requestTransfer(transaction);
	};

	const [wallets, setWallets] = useState<Wallet[]>([]);

	const getWallets = useCallback(async () => {
		try {
			const data = await walletApi.getItems();

			if (isMounted()) {
				setWallets(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	useEffect(
		() => {
			getWallets();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const { isWalletConnectShowing, toggleWalletConnect } =
		useWalletConnectModal();

	//find offer modal
	const { isMatchingOfferShowing, toggleMatchingOffer } =
		useMatchingOfferModal();

	//request transferred modal
	const { isRequestTransferShowing, toggleRequestTransfer } =
		useRequestTransferModal();

	//find token transferred
	const { isTokenTransferedShowing, toggleTokenTransfered } =
		useTokenTransferedModal();

	//confirm purchase
	const { isConfirmPurchaseShowing, toggleConfirmPurchase } =
		useConfirmPurchaseModal();

	//form error message
	const [errorMessage, setErrorMessage] = React.useState("");

	const { web3Provider, connect, disconnect } = useWeb3();

	const [picanteCharge, setPicanteCharge] = React.useState(0);

	const changePaymentMethod = (event: { target: { value: any } }) => {
		formik.setFieldValue("paymentMethod", event.target.value);
	};

	const changeWallet = (event: { target: { value: any } }) => {
		formik.setFieldValue("receiveWallet", event.target.value);
	};

	const handlePayAmountChange = (event: { target: { value: any } }) => {
		formik.setFieldValue("amountPay", event.target.value);
		//assumme GBP to USDC is 1:1.25
		var receiveValue =
			((event.target.value * (100 - picanteChargePercentage)) / 100) *
			1.25;
		setPicanteCharge((event.target.value * picanteChargePercentage) / 100);
		formik.setFieldValue("amountReceive", receiveValue);
	};

	const callCreatePaymentToken = (
		cref: React.MutableRefObject<undefined>,
		txn: any
	) => {
		cref?.current?.callCreatePaymentToken(txn);
	};

	const requestTransfer = async (t: any) => {
		try {
			const response = await fetch(PicanteApi.RequestTransfer, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(t),
			});
			if (!response.ok) {
				return;
			}
			const data = await response.json();

			if (!data.TransactionHashHex) {
				throw new Error("transfer request error");
			}

			let txn = await web3Provider.waitForTransaction(
				data.TransactionHashHex
			);

			if (txn) {
				if (txn.blockNumber) {
					toggleRequestTransfer();
					setTxnHash(data.TransactionHashHex);
					toggleTokenTransfered();
					console.log("Transfer success");
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

	const formik = useFormik({
		initialValues: {
			amountPay: undefined,
			amountReceive: 0,
			amountReward: 0,
			paymentMethod: 1,
			receiveWallet: undefined,
			submit: null,
		},
		validationSchema: Yup.object({
			amountPay: Yup.number()
				.required("Amount Pay is required")
				.min(1, "at least £1")
				.max(5000, "at most £5000"),
			paymentMethod: Yup.string().required("Select a payment method"),
			receiveWallet: Yup.string().required("Select a wallet"),
		}),
		onSubmit: async (values, helpers): Promise<void> => {
			setErrorMessage("");
			try {
				let provider = null;
				// Step 1. connect wallet
				if (!web3Provider) {
					toggleWalletConnect();

					provider = await connect();

					toggleWalletConnect();
				} else {
					provider = web3Provider;
				}

				toggleConfirmPurchase();

				const signer = provider.getSigner();

				const iface = new Interface(DexContractAbi);
				var abi = iface.format(FormatTypes.full);

				const myDexContract = new ethers.Contract(
					DexContractAddr,
					abi,
					signer
				);
				console.log(
					"ether: " +
						ethers.utils.parseEther(values.amountReceive.toString())
				);
				var findOffer = null;
				findOffer = await myDexContract.findOffer(
					tokenAddr,
					ethers.utils.parseEther(values.amountReceive.toString())
				);

				console.log("waiting transaction complete in blockchain");
				toggleConfirmPurchase();
				toggleMatchingOffer();
				//Record this receipt to backend
				const receipt = await findOffer.wait();

				console.log("transaction is completed");

				// console.log(receipt);

				const decode = myDexContract.interface.decodeEventLog(
					"CreateTransaction",
					receipt.logs[0].data
				);

				// console.log(decode.txn);

				callCreatePaymentToken(cref, decode.txn);
				toggleMatchingOffer();
				togglePayment();
				console.log("switch to payment screen");

				return;
			} catch (err) {
				console.error(err);
				console.error(err.data.message);
				if (
					err.data.message == "execution reverted: no suitable offer"
				) {
					setErrorMessage("No suitable offer for now.");
				}
			}
		},
	});

	return (
		<form noValidate onSubmit={formik.handleSubmit} {...props} >
			<WalletConnectModal
				isWalletConnectShowing={isWalletConnectShowing}
				hide={isWalletConnectShowing}
			/>
			<TradeMatchingOfferModal
				isMatchingOfferShowing={isMatchingOfferShowing}
				hide={toggleMatchingOffer}
			/>
			<TradePaymentModal
				sendPaymentMetaToParent={sendPaymentMetaToParent}
				isPaymentShowing={isPaymentShowing}
				hide={togglePayment}
				ref={cref}
			/>
			<RequestTransferModal
				isRequestTransferShowing={isRequestTransferShowing}
				hide={toggleRequestTransfer}
			/>
			<TokenTransferedModal
				isTokenTransferedShowing={isTokenTransferedShowing}
				txnHash={txnHash}
				hide={toggleTokenTransfered}
			/>
			<ConfirmPurchaseModal
				isConfirmPurchaseShowing={isConfirmPurchaseShowing}
				hide={toggleConfirmPurchase}
			/>
			<Grid container spacing={2.5} mb={2.5}>
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
						label="Buy"
						variant="outlined"
						value={formik.values.amountPay}
						type="number"
						inputProps={{
							maxLength: 13,
							max: 5000,
							min: 1,
							step: "1",
						}}
						onChange={(e) => {
							handlePayAmountChange(e);
						}}
					/>
				</Grid>
				<Grid item md={4} xs={4} >
					<FiatSelector />
				</Grid>
			</Grid>
			<Grid container spacing={2.5} mb={2.5}>
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
			<Grid container spacing={2.5} mb={2.5} sx={{marginLeft:'0px',marginTop:'5px'}}>
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
			<Grid container spacing={2.5} mb={2.5}>
				<Grid item md={8} xs={8}>
					<TextField
						fullWidth
						id="buy-form-amount-receive"
						label="You receive (estimated)"
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
			<Grid container spacing={2.5} mb={2.5}>
				<Grid item md={8} xs={8}>
					<TextField
						fullWidth
						id="buy-form-amount-reward"
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
					<WalletSelector
						wallets={wallets}
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
			{errorMessage && (
				<Grid container spacing={4}>
					<Grid item md={12} xs={12}>
						<p className="error"> {errorMessage} </p>
					</Grid>
				</Grid>
			)}
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
					Buy now
				</Button>
			</Box>
		</form>
	);
};
function isMounted() {
	throw new Error("Function not implemented.");
}
