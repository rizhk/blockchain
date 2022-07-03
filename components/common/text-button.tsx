import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

const StyledTextButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  borderColor: theme.palette.text.primary,
  '&:hover': {
    borderColor: theme.palette.text.primary,
  },
}));

export interface ITextButtonProps extends React.ComponentPropsWithoutRef<typeof StyledTextButton> {}

export const TextButton: React.FC<ITextButtonProps> = ({ children, variant = 'outlined', ...rest }) => {
  return (
    <StyledTextButton variant={variant} {...rest}>
      {children}
    </StyledTextButton>
  );
};
