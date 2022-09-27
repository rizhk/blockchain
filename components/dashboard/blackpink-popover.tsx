import type { FC } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';

interface BlackPinkPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

interface Items {
  id: string;
  name?: string;
  profile_pic_url?: string;
  base_currency: string;
  created_at?: string;
  updated_at: string;
}
interface Data {
  selected?: string;
  count?: number;
  items: Items[];
}

const data: Data = {
  selected: 'c9f0d8286d189de6ee4d614f6176c6e0ba5abb09d08c5151ff1f5dd4de228156',
  count: 3,
  items: [
    {
      id: 'c9f0d8286d189de6ee4d614f6176c6e0ba5abb09d08c5151ff1f5dd4de228156',
      name: 'Personal',
      profile_pic_url:
        'https://d2b5do6l860fxo.cloudfront.net/dev_c9f0d8286d189de6ee4d614f6176c6e0ba5abb09d08c5151ff1f5dd4de228156/profile.png',
      base_currency: 'USD',
      created_at: '2022-08-31T06:16:42.343242342',
      updated_at: '2022-08-31T06:16:42.343242342',
    },
    {
      id: '01GDNT8WFN19F7J3PMYWG12M2Q',
      name: 'Sanity',
      profile_pic_url:
        'https://d2b5do6l860fxo.cloudfront.net/dev_01GDNT8WFN19F7J3PMYWG12M2Q/01GDNT8WFN41SDK9S085XJQYC2.jpg',
      base_currency: 'USD',
      created_at: '2022-08-31T06:16:42.343242342',
      updated_at: '2022-08-31T06:16:42.343242342',
    },
    {
      id: '01GDNM223VVD1QYRSZ9RKNXXR6',
      name: 'Jie Yang Song',
      profile_pic_url:
        'https://d2b5do6l860fxo.cloudfront.net/dev_01GDNM223VVD1QYRSZ9RKNXXR6/01GDNM223VJG70Z7D0P073G4WG.png',
      base_currency: 'USD',
      created_at: '2022-08-31T06:16:42.343242342',
      updated_at: '2022-08-31T06:16:42.343242342',
    },
  ],
};

export const BlackPinkPopover: FC<BlackPinkPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const { i18n, t } = useTranslation();

  const handleChange = async (language: Language): Promise<void> => {
    onClose?.();
    await i18n.changeLanguage(language);
    toast.success(t('Language changed') as string);
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
      {data.items.map((item) => (
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

BlackPinkPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
