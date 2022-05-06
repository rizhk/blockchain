import { useLottie } from "lottie-react";
import selectWalletAnimation from "./select-wallet.json";

const SelectWalletLottie = () => {
	const options = {
		animationData: selectWalletAnimation,
		loop: true,
		autoplay: true,
	};

	const { View } = useLottie(options);

	return View;
};

export default SelectWalletLottie;
