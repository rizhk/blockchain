import type { FC } from 'react';
import { useState } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import Image from 'next/image';

import { portfolioApi } from 'api/portfolio-api';

import useFetch from 'hooks/use-fetch';
import { Crown as CrownIcon } from '../../icons/crown';

interface PortfolioSwitcherProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
  setOption?: (name: any) => void;
}

export const PortfolioSwitcherPopover: FC<PortfolioSwitcherProps> = (props) => {
  const { anchorEl, onClose, open, setOption, ...other } = props;
  const { i18n, t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleChange = (item: any): void => {
    onClose?.();
    setOption(item.name);
    setSelectedOption(item);
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
            >
              <Image
                width="20"
                height="20"
                src={item.profile_pic_url ? item.profile_pic_url : '/static/portfolio/avatar_placeholder.png'}
              />
            </Box>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="subtitle2">{item.name}</Typography>} />
          {selectedOption == item ? <CrownIcon /> : null}
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
