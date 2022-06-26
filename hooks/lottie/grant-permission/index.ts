import { useLottie } from 'lottie-react';
import grantPermissionAnimation from './grant-permission.json';

const GrantPermissionLottie = () => {
  const options = {
    animationData: grantPermissionAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return View;
};

export default GrantPermissionLottie;
