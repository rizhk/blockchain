import { useLottie } from 'lottie-react';
import permissionGrantedAnimation from './permission-granted.json';

const PermissionGrantedLottie = () => {
  const options = {
    animationData: permissionGrantedAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return View;
};

export default PermissionGrantedLottie;
