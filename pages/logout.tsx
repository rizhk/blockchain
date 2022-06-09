import { useEffect } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import {
	Box,
	Button,
	Container,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { gtm } from "../lib/gtm";

const Logout: NextPage = () => {
	const theme = useTheme();
	const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		gtm.push({ event: "page_view" });
	}, []);

	return (
		<>
			<Head>
				<title>
					Error: Not Found |{" "}
					{process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
				</title>
			</Head>
			<Box
				component="main"
				sx={{
					alignItems: "center",
					backgroundColor: "background.paper",
					display: "flex",
					flexGrow: 1,
					py: "80px",
				}}>
				<Container maxWidth="lg">
					<Typography
						align="center"
						variant={mobileDevice ? "h4" : "h1"}>
						You've been logout
					</Typography>
					{/* <Typography
						align="center"
						color="textSecondary"
						sx={{ mt: 0.5 }}
						variant="subtitle2">
						You've been logout
					</Typography> */}
					{/* <Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mt: 6,
						}}>
						<Box
							alt="Under development"
							component="img"
							src={`/static/error/error404_${theme.palette.mode}.svg`}
							sx={{
								height: "auto",
								maxWidth: "100%",
								width: 400,
							}}
						/>
					</Box> */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mt: 6,
						}}>
						<NextLink href="/dashboard" passHref>
							<Button component="a" variant="outlined">
								Back to Dashboard
							</Button>
						</NextLink>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Logout;