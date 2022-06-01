import {
	Avatar,
	Box,
	Button,
	Container,
	Paper,
	Typography,
} from "@mui/material";
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useRef,
	useEffect,
} from "react";
import ReactDOM from "react-dom";
import {
	usePlaidLink,
	PlaidLinkOptions,
	PlaidLinkOnSuccess,
	PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";
import { ethers } from "ethers";
import { useWeb3 } from "hooks/Web3Client";
import { default as DexContractAbi } from "contracts/PicanteDexAbi.json";
import { FormatTypes, Interface } from "ethers/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PicanteApi } from "api/end-point";

var DexContractAddr = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDRESS;

const TradePaymentModal = (
	props: { isPaymentShowing: any; sendPaymentMetaToParent: any; hide: any },
	ref: React.Ref<unknown> | undefined
) => {
	const [linkToken, setLinkToken] = useState("");

	let _txn = useRef(PaymentRequest);
	const [accHolder, setAccHolder] = useState("");
	const [paymentId, setPaymentId] = useState("");
	useEffect(function persistPaymentId() {
		localStorage.setItem("paymentId", paymentId);
	});

	type PaymentRequest = {
		amount: string;
		sellerAcc: {
			id: string;
			accHolder: string;
			accountNum: string;
			sortCode: string;
			iban: string;
		};
	};

	type TransferRequest = {
		transactionId: string;
		paymentId: string;
	};

	useImperativeHandle(
		ref,
		() => ({
			callCreatePaymentToken(txn: any) {
				setAccHolder(txn.sellerAcc.accHolder);
				// setAmount(ethers.utils.formatEther(txn.amount)); //To be fixed
				_txn.current = txn;
				createPaymentToken();
			},
		}),
		[]
	);

	const createPaymentToken = async () => {
		console.log("Initial payment with plaid");
		let p: PaymentRequest = {
			amount: Number(ethers.utils.formatEther(_txn.current.amount)), //TODO use buyGemAmount in contract, for now it's hardcord 1:1.25
			sellerAcc: {
				id: _txn.current.sellerAcc.id,
				accHolder: _txn.current.sellerAcc.accHolder,
				accountNum: _txn.current.sellerAcc.accountNum.toString(),
				sortCode: _txn.current.sellerAcc.sortCode.toString(),
				iban: _txn.current.sellerAcc.iban,
			},
		};

		try {
			const response = await fetch(
				PicanteApi.PlaidCreatePaymentLinkToken,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(p),
				}
			);
			if (!response.ok) {
				return;
			}
			const data = await response.json();

			if (data.link_token) {
				//
				console.log("setToken: " + data.link_token);
				setLinkToken(data.link_token);
				console.log("setPaymentId: " + data.payment_id);
				setPaymentId(data.payment_id);

				if (ready) {
					console.log("Ready");
				}
			} else {
				console.log("Link Token cannot be created");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (public_token, metadata) => {
			console.log(public_token, metadata);

			let t: TransferRequest = {
				txn_id: _txn.current.id.toString(),
				payment_id: localStorage.getItem("paymentId"),
			};

			props.sendPaymentMetaToParent(t);
		},
		onLoad: () => {
			console.log(
				"WhenPlaid Link loading, the linkToken is: " + linkToken
			);
		},
		env: "sandbox",
	});

	return props.isPaymentShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<Box
						sx={{
							backgroundColor: "background.default",
							minHeight: "100%",
							p: 3,
						}}
						className="modal-overlay">
						<Container
							maxWidth="sm"
							sx={{
								mt: 12,
							}}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}>
								<Typography
									variant="h5"
									className="modal-header">
									It’s a match!
								</Typography>
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 3, mb: 3 }}
									variant="body2">
									We have found a seller of USDC to complete
									your order. Click on the button below to pay
									for your USDC.
								</Typography>
								<Box sx={{ m: 4 }}>
									<LazyLoadImage
										width="70"
										height="70"
										src={
											process.env.NEXT_PUBLIC_URL +
											"static/trade/Success-Tick.gif"
										}
										alt="Your sell order has been submitted."
									/>
								</Box>
								{/* <Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 1 }}
									variant="h6">
									Seller: {accHolder}
								</Typography> */}
								<Button
									size="large"
									variant="contained"
									onClick={() => open()}
									disabled={!ready}>
									Pay now to complete transaction
								</Button>
								<Typography
									align="center"
									color="neutral.500"
									sx={{ mt: 3 }}
									variant="body2">
									<span>payment secured by&nbsp;</span>
									<LazyLoadImage
										src={
											process.env.NEXT_PUBLIC_URL +
											"static/trade/plaid-logo.svg"
										}
										alt="Plaid"
									/>
								</Typography>
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(TradePaymentModal);
