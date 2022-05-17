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

const WalletConnectModal = (
	props: { isWalletConnectShowing: any; hide: any },
	ref: React.Ref<unknown> | undefined
) => {
	const { web3Provider, connect, disconnect } = useWeb3();

	return props.isWalletConnectShowing
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
									style={{
										textAlign: "center",
									}}>
									Connect to your wallet
								</Typography>
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 2, mb: 2 }}
									variant="body2">
									Please connect your wallet to continue.
								</Typography>
								<WalletConnectLottie />
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(WalletConnectModal);
