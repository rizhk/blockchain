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
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TransferRequest } from "types/transaction";
import { ProgressSteps } from "components/common/progress-steps";


const progressStages = [
	{
	  label: 'Select a wallet',
	  status: 'complete',
	},
	{
	  label: 'Connect to you wallet',
	   status: 'complete',
	},
	{
	  label: 'Match with seller',
	  status: 'complete',
	},
	{
	  label: 'Payment',
	   status: 'pending',
	},
	{
	  label: 'Receive your Crypto',
	   status: 'pending',
	},
  ]

const TradePaymentModal = (
	props: {
		isPaymentShowing: any;
		sendPaymentMetaToParent: any;
		hide: any;
	},
	ref: React.Ref<unknown> | undefined
) => {
	const [linkToken, setLinkToken] = useState("");

	let _txn = useRef(PaymentRequest);
	const [paymentId, setPaymentId] = useState("");

	useEffect(function persistPaymentId() {
		localStorage.setItem("paymentId", paymentId);
	});

	useImperativeHandle(
		ref,
		() => ({
			callCreatePaymentToken(data: any) {
				_txn.current = data;
				// createPaymentToken();
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
			},
		}),
		[]
	);

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (public_token, metadata) => {
			let t: TransferRequest = {
				txn_id: String(_txn.current.txn_id),
				payment_id: String(localStorage.getItem("paymentId")),
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
							minHeight: "110%",
							p: 3,
						}}
						className="modal-overlay">
						<Container
							maxWidth="sm"
							sx={{
								mt: 8,
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
									sx={{ mt: 2, mb: 2 }}
									variant="body2">
									We have found a seller of USDC to complete
									your order. Click on the button below to pay
									for your USDC.
								</Typography>
								<Box sx={{ m:3 }}>
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
								<ProgressSteps progressTitle="Progress" progressStages={progressStages} activeStep={2}/>
					
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(TradePaymentModal);
