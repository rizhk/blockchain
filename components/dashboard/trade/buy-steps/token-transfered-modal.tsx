import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import Router from "next/router";

const TokenTransferedModal = (
	props: { isTokenTransferedShowing: any; hide: any; txnHash: any },
	ref: React.Ref<unknown> | undefined
) => {
	return props.isTokenTransferedShowing
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
								mt: 5,
							}}>
							<Paper
								elevation={12}
								sx={{
									pt: 8,
									pb: 4,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
								className="modal">
								<Typography
									variant="h5"
									style={{
										textAlign: "center",
									}}>
									We had transfered USDC to your wallet.
								</Typography>
								<Box sx={{ m: 6 }}>
									<img
										src={
											process.env.NEXT_PUBLIC_URL +
											"static/trade/Success-Tick.gif"
										}
										alt="We had transfered USDC to your wallet."
									/>
								</Box>
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 1 }}
									variant="body2">
									Thank you for using Picante.
								</Typography>
								<Box sx={{ mt: 3 }}>
									{/* <Button
										size="large"
										variant="contained"
										sx={{
											background:
												"linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)",
										}}
										onClick={() =>
											Router.push(
												"/dashboard/transactions"
											)
										}>
										Close
									</Button> */}
									{props.txnHash && (
										<Button
											size="large"
											variant="contained"
											sx={{
												background:
													"linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)",
											}}
											onClick={() =>
												window.open(
													"https://mumbai.polygonscan.com/tx/" +
														props.txnHash,
													"_blank"
												)
											}>
											View Transaction
										</Button>
									)}
								</Box>
							</Paper>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(TokenTransferedModal);
