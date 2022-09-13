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
  Snackbar,
  Alert,
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
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { EditWalletDialog } from './edit-wallet-modal';

export enum ListAction {
  ADD,
  EDIT,
  DELETE,
}

interface WalletListProps {
  wallets: Wallet[];
  walletsCount: number;
  parentCallback: (wallets: Wallet[], action?: ListAction) => void;
}

interface MoreMenuProps {
  onDelete: () => void;
  onEdit: () => void;
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
        <MenuItem onClick={() => props.onEdit()}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        {/* <MenuItem onClick={() => props.onDelete()}>
          <ListItemIcon>
            <TrashIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem> */}
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

  const [addOpen, setAddOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddClick = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };

  const [editOpen, setEditOpen] = useState(false);
  const [editWallet, setEditWallet] = useState<Wallet | null>();
  const handleEditClick = (wallet: Wallet) => {
    setEditWallet(wallet);
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setEditWallet(null);
  };

  return (
    <Grid maxWidth="xl">
      <Box sx={{ mb: 1 }}>
        <Grid container justifyContent="space-between" flexWrap="nowrap">
          <Grid
            item
            minWidth="fit-content"
            sx={{ mb: 1, pt: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant="h6" className="pageTitle">
              {t('portfolio.walletList.myWallets')} ({walletsCount | 0})
            </Typography>
            <Button color="info" variant="contained" onClick={handleAddClick}>
              {t('portfolio.walletList.add')}
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={copied}
          autoHideDuration={2000}
          onClose={() => setCopied(false)}
          message={t('portfolio.walletList.copied')}
        />
      </Box>
      <Box sx={{ pt: 2 }}>
        <Card>
          <Scrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="15%">{t('portfolio.walletList.type')}</TableCell>
                  <TableCell width="30%">{t('portfolio.walletList.nickname')}</TableCell>
                  <TableCell width="22%">{t('portfolio.walletList.address')}</TableCell>
                  <TableCell width="23%" align="center">
                    {t('portfolio.walletList.netWorth')}
                  </TableCell>
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
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Image src={`/static/crypto/color/${wallet.icon_tag}.svg`} height="30" width="30" />{' '}
                            <Typography sx={{ pl: 1 }} variant="subtitle2">
                              {wallet.type}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{wallet.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ pr: 0.5, minWidth: '120px' }} variant="subtitle2">
                              {primitivesUtils.getShortTxnId(wallet.address)}
                            </Typography>
                            <Button
                              onClick={() => {
                                navigator.clipboard.writeText(wallet.address);
                                setCopied(true);
                              }}
                              sx={{ p: 0.5, minWidth: '48px' }}
                            >
                              <ContentCopyIcon />
                            </Button>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="subtitle2">
                            {primitivesUtils.convertFiatAmountDisplay(wallet.fiat_value)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <MoreMenu
                            onDelete={async () => {
                              const success = await walletApi.remove(wallet.id);

                              if (success) {
                                const NewWallets = wallets.filter((item) => item.id !== wallet.id);
                                props.parentCallback(NewWallets, ListAction.DELETE);
                              }
                            }}
                            onEdit={() => handleEditClick(wallet)}
                          />
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
        <AddWalletDialog
          open={addOpen}
          handleClose={handleAddClose}
          parentCallback={(wallet: Wallet[]) => props.parentCallback(wallet, ListAction.ADD)}
        />
      </Box>

      {editWallet != null && (
        <EditWalletDialog
          wallet={editWallet}
          open={editOpen}
          handleClose={handleEditClose}
          parentCallback={(wallet: Wallet[]) => props.parentCallback(wallet, ListAction.EDIT)}
        />
      )}
    </Grid>
  );
};
