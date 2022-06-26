import { useLottie } from 'lottie-react';
import sendTokenAnimation from './send-token-to-buyer.json';

const SendTokenLottie = () => {
  const options = {
    animationData: sendTokenAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return View;
};

export default SendTokenLottie;
