import React from "react";
import { useWeb3 } from "../hooks/Web3Client";
import { Button } from "@mui/material";

interface ConnectProps {
	connect: (() => Promise<void>) | null;
}
const ConnectButton = ({ connect }: ConnectProps) => {
	return connect ? (
		<Button
			fullWidth
			size="large"
			variant="contained"
			type="submit"
			onClick={connect}>
			Connect
		</Button>
	) : (
		<Button>Loading...</Button>
	);
};

interface DisconnectProps {
	disconnect: (() => Promise<void>) | null;
}

const DisconnectButton = ({ disconnect }: DisconnectProps) => {
	return disconnect ? (
		<button onClick={disconnect}>Disconnect</button>
	) : (
		<button>Loading...</button>
	);
};

export function Web3Button() {
	const { web3Provider, connect, disconnect } = useWeb3();

	return web3Provider ? (
		<DisconnectButton disconnect={disconnect} />
	) : (
		<ConnectButton connect={connect} />
	);
}
