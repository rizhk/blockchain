import { Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { primitivesUtils } from 'utils/primitives-utils';

export interface ITokenSymbolDisplayProps extends React.ComponentProps<typeof Typography> {
  name: string;
}

export const TokenSymbolDisplay: React.FC<ITokenSymbolDisplayProps> = ({ name, ...rest }) => {
  const knownTokenSymbols = ['USDC', 'WLUNA', 'LUNA'];

  const { trimmed, tokenSymbol } = React.useMemo(() => {
    const found = knownTokenSymbols.some((item) => {
      return item.toLowerCase() === name.toLowerCase();
    });
    if (found) return { trimmed: false, tokenSymbol: name };
    else return { trimmed: true, tokenSymbol: primitivesUtils.getFirstNChars(name, 6) };
  }, [name]);
  return (
    <>
      {trimmed ? (
        <Tooltip title={name}>
          <Typography {...rest}>{tokenSymbol}...</Typography>
        </Tooltip>
      ) : (
        <Typography {...rest}>{tokenSymbol}</Typography>
      )}
    </>
  );
};
