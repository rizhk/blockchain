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

export const useLoader = () => {
  const [isLoaderShowing, setIsLoaderShowing] = useState(false);

  function toggleLoader() {
    setIsLoaderShowing((oldIsLoaderShowing) => !oldIsLoaderShowing);
  }

  return {
    isLoaderShowing: isLoaderShowing,
    toggleLoader: toggleLoader,
  };
};
