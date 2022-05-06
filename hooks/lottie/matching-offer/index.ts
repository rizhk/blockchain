import { useLottie } from "lottie-react";
import matchingOfferAnimation from "./matching-offer.json";

const matchingOfferLottie = () => {
	const options = {
		animationData: matchingOfferAnimation,
		loop: true,
		autoplay: true,
	};

	const { View } = useLottie(options);

	return View;
};

export default matchingOfferLottie;
