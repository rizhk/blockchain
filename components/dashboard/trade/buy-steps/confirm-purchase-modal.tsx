import {
	Avatar,
	Box,
	Button,
	Container,
	Paper,
	Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Check as CheckIcon } from "icons/check";
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useRef,
	useEffect,
} from "react";
import ReactDOM from "react-dom";
import { ethers } from "ethers";
import { useWeb3 } from "hooks/Web3Client";
import WalletConnectLottie from "hooks/lottie/buy-select-wallet/";

const ConfirmPurchaseModal = (
	props: { isConfirmPurchaseShowing: any; hide: any },
	ref: React.Ref<unknown> | undefined
) => {
	const { web3Provider, connect, disconnect } = useWeb3();

	return props.isConfirmPurchaseShowing
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
								p: 5,
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
									style={{
										textAlign: "center",
									}}>
									Confirm your purchase
								</Typography>
								<WalletConnectLottie />
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 1 }}
									variant="body2">
									Confirm your purchase when your wallets
									prompts you.
								</Typography>
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(ConfirmPurchaseModal);
