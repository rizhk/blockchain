import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Typography } from "@mui/material";

import { gtm } from "../lib/gtm";
import { MainLayout } from "../components/main-layout";

const Logout: NextPage = () => {
	return (
		<MainLayout>
			<Typography variant="h2" sx={{ m: 10 }}>
				Logout
			</Typography>
		</MainLayout>
	);
};

export default Logout;
