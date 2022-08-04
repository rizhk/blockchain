import { ChangeEvent, Fragment, MouseEvent, useRef, useState } from 'react';
import type { FC } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CardContent,
  Card,
  CardHeader,
  CardActions,
  Divider,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { Wallet } from 'types/portfolio/wallet';
import { walletApi } from 'api/portfolio/wallet-api';
import { Scrollbar } from 'components/scrollbar';
import { AddWalletDialog } from './add-wallet-modal';
import { primitivesUtils } from 'utils/primitives-utils';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Trash as TrashIcon } from 'icons/trash';
interface WalletListProps {
  wallets: Wallet[];
  walletsCount: number;
  parentCallback: (wallets: Wallet[]) => void;
}

interface MoreMenuProps {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const MoreMenu: FC<MoreMenuProps> = (props) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMenuOpen = (): void => {
    setOpenMenu(true);
  };

  const handleMenuClose = (): void => {
    setOpenMenu(false);
  };

  return (
    <Fragment>
      <IconButton onClick={handleMenuOpen} ref={anchorRef}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{
          sx: {
            maxWidth: '100%',
            width: 256,
          },
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <MenuItem onClick={() => props.onDelete('')}>
          <ListItemIcon>
            <TrashIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export const WalletList: FC<WalletListProps> = (props) => {
  const { t } = useTranslation();
  const { wallets, walletsCount } = props;

  const handleDelete = async (address: string) => {
    const success = await walletApi.remove(address);

    if (success) {
      const NewWallets = wallets.filter((item) => item.address !== address);
      props.parentCallback(NewWallets);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ maxWidth: 816 }}>
        <Grid item sx={{ mb: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Wallets ({walletsCount | 0})</Typography>
          <Button color="info" variant="contained" onClick={handleClickOpen}>
            Add a wallet
          </Button>
        </Grid>
      </Grid>
      <Card sx={{ maxWidth: 816 }}>
        <Scrollbar>
          <Table sx={{ maxWidth: 816 }}>
            <TableHead>
              <TableRow>
                <TableCell width="15%">TYPE</TableCell>
                <TableCell width="30%">NICKNAME</TableCell>
                <TableCell width="22%">Address</TableCell>
                <TableCell width="23%">Net worth (USD)</TableCell>
                <TableCell width="10%" align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {walletsCount === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography align="center">{t('portfolio.walletList.connectWalletToStart')}</Typography>
                  </TableCell>
                </TableRow>
              )}
              {wallets?.map((wallet) => {
                return (
                  <Fragment key={wallet.id}>
                    <TableRow hover key={wallet.id}>
                      <TableCell>
                        <Image src={`/static/crypto/color/${wallet.icon_tag}.svg`} height="30" width="30" />{' '}
                        {wallet.type}
                      </TableCell>
                      <TableCell>
                        <Typography>{wallet.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{primitivesUtils.getShortTxnId(wallet.address)}</Typography>
                      </TableCell>
                      <TableCell>
                        {wallet.fiat_currency}{' '}
                        {primitivesUtils.thousandSeparator(
                          primitivesUtils.roundDownToTwo(parseFloat(wallet.fiat_value)),
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <MoreMenu onDelete={(id) => {}} onEdit={(id) => {}} />
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={wallets?.length | 0}
          onPageChange={(): void => {}}
          onRowsPerPageChange={(): void => {}}
          page={0}
          rowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <AddWalletDialog open={open} handleClose={handleClose} parentCallback={props.parentCallback} />
    </Container>
  );
};
