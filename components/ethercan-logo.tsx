import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface EtherscanLogoProps {
  width?: string;
  height?: string;
}

export const EtherscanLogo = styled((props: EtherscanLogoProps) => {
  const { ...other } = props;

  return (
    <LazyLoadImage
      width={props?.width || '42'}
      height={props?.height || '42'}
      src={process.env.NEXT_PUBLIC_URL + 'etherscan-logo.svg'} // use normal <img> attributes as props
    />
  );
})``;
