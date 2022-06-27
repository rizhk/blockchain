import { useState } from 'react';

export const useModalLoader = () => {
  const [isModalLoaderShowing, setIsModalLoaderShowing] = useState(false);

  function toggleModalLoader() {
    setIsModalLoaderShowing((oldIsModalLoaderShowing) => !oldIsModalLoaderShowing);
  }

  return {
    isModalLoaderShowing: isModalLoaderShowing,
    toggleModalLoader: toggleModalLoader,
  };
};
