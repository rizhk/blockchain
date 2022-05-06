import { Box, Container, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import SendTokenLottie from "hooks/lottie/send-token-to-buyer";

const RequestTransferModal = (
	props: { isRequestTransferShowing: any; hide: any },
	ref: React.Ref<unknown> | undefined
) => {
	return props.isRequestTransferShowing
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
									Your USDC is being sent to your wallet
								</Typography>
								<SendTokenLottie />
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 1 }}
									variant="body2">
									We are now transfering your crypto to your
									wallet. Depending on network speeds, this
									may take anywhere from a few seconds to a
									few minutes.
								</Typography>
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(RequestTransferModal);
