import { Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { primitivesUtils } from 'utils/primitives-utils';

export interface ITokenSymbolDisplayProps extends React.ComponentProps<typeof Typography> {
  amt: string | number;
  name: string;
}

export const TokenSymbolDisplay: React.FC<ITokenSymbolDisplayProps> = ({ amt, name, ...rest }) => {
  const knownTokenSymbols = ['USDC', 'WLUNA', 'LUNA'];

  const { trimmed, tokenSymbol } = React.useMemo(() => {
    const found = knownTokenSymbols.some((item) => {
      return item.toLowerCase() === name.toLowerCase();
    });
    if (found) return { trimmed: false, tokenSymbol: name };
    else {
      if (name.length >= 6) {
        return { trimmed: true, tokenSymbol: primitivesUtils.getFirstNChars(name, 6) };
      } else {
        return { trimmed: false, tokenSymbol: name };
      }
    }
  }, [name]);
  return (
    <>
      {trimmed ? (
        <Tooltip title={name}>
          <Typography variant="subtitle2" {...rest}>
            {primitivesUtils.convertCryptoAmountDisplay(amt, tokenSymbol)}...
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="subtitle2" {...rest}>
          {primitivesUtils.convertCryptoAmountDisplay(amt, tokenSymbol)}
        </Typography>
      )}
    </>
  );
};
