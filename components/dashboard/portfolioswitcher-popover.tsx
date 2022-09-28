import type { FC } from 'react';
import { useState } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';

import { portfolioApi } from 'api/portfolio-api';

import useFetch from 'hooks/use-fetch';

interface PortfolioSwitcherProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
  setOption?: (name: any) => void;
}

export const PortfolioSwitcherPopover: FC<PortfolioSwitcherProps> = (props) => {
  const { anchorEl, onClose, open, setOption, ...other } = props;
  const { i18n, t } = useTranslation();

  const { data } = useFetch(async () => {
    let data = await portfolioApi.Authme();
    let portfolio = data?.me?.portfolio;
    let selected = portfolio?.selected;
    for (var item of portfolio.items) {
      if (item.id == selected) {
        setOption(item.name);
      }
    }
    return data;
  }, []);

  const handleChange = async (item: any): Promise<void> => {
    onClose?.();
    setOption(item.name);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 240 } }}
      transitionDuration={0}
      {...other}
    >
      {data?.me?.portfolio?.items?.map((item) => (
        <MenuItem onClick={() => handleChange(item)} key={item}>
          <ListItemIcon>
            <Box
              sx={{
                display: 'flex',
                height: 20,
                width: 20,
                '& img': {
                  width: '100%',
                },
              }}
            ></Box>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="subtitle2">{item.name}</Typography>} />
        </MenuItem>
      ))}
    </Popover>
  );
};

PortfolioSwitcherPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  setOption: PropTypes.func,
};
