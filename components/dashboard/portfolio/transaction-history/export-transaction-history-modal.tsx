/* eslint-disable react/display-name */
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  FormHelperText,
  Alert,
} from '@mui/material';
import { portfolioApi } from 'api/portfolio-api';
import { Divider } from 'components/common/divider';
import { LoadingButton } from 'components/common/loading-button';
import { TextButton } from 'components/common/text-button';
import useFetch from 'hooks/use-fetch';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { saveAs } from 'file-saver';

export interface IExportTransactionHistoryModalProps {
  isShowing: boolean;
  hide: () => void;
}

const ExportTransactionHistoryModal = ({ isShowing, hide }: IExportTransactionHistoryModalProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [range, setRange] = useState<string>('last-30-days');
  const [fileType, setFileType] = useState<string>('csv');

  const handleClose = (event: React.ChangeEvent<HTMLButtonElement>, reason: string) => {
    hide();
    document.body.style.overflow = 'auto';
  };

  const { i18n, t } = useTranslation();

  const handleOnChangeRange = (event: { target: { value: string } }) => {
    setRange(event.target.value);
  };

  const handleOnChangeFileType = (event: { target: { value: string } }) => {
    setFileType(event.target.value);
  };

  const handleOnClickExport = async () => {
    trigger();
  };

  const { data, loading, error, resetError, trigger } = useFetch(() => {
    return portfolioApi.exportTransactionHistory({}, { defaultErrorMessage: t('transaction.exportTransactionError') });
  });

  useEffect(() => {
    if (data) {
      saveAs(data.blob, data.fileName);
    }
  }, [JSON.stringify(data)]);

  return (
    <Dialog fullScreen={fullScreen} open={isShowing} onClose={handleClose}>
      <DialogContent sx={{ width: 420 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ mx: 1, mb: 2 }} variant="h6" component="h2">
              {t('portfolio.transHis.exportTransHis')}
            </Typography>
          </Grid>
          {/* <Grid container item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="data-range-select"
                value={range}
                select
                label={t('portfolio.transHis.dataRange')}
                onChange={handleOnChangeRange}
                SelectProps={{ MenuProps: { disableScrollLock: true } }}
              >
                <MenuItem value="last-30-days" key="last-30-days" selected={true}>
                  {t('portfolio.transHis.last30Days')}
                </MenuItem>
              </TextField>
            </FormControl>
          </Grid> */}
          <Grid container item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="data-range-fileType"
                value={fileType}
                select
                label={t('portfolio.transHis.fileType')}
                onChange={handleOnChangeFileType}
                SelectProps={{ MenuProps: { disableScrollLock: true } }}
              >
                <MenuItem value="csv" key="csv" selected={true}>
                  {t('portfolio.transHis.csv')}
                </MenuItem>
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
        <Grid justifyContent="space-between" alignItems="center" container item xs={12}>
          <Box flex="1 1 100%" sx={{ mt: 2 }}></Box>
          {error && !loading && (
            <Grid item flex="1 1 100%" sx={{ mb: 2 }}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          <Typography onClick={hide} variant="caption2" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
            {t('portfolio.transHis.cancel')}
          </Typography>
          <LoadingButton
            loading={loading}
            onClick={handleOnClickExport}
            variant="contained"
            color="info"
            sx={{ ml: 1 }}
          >
            {t('portfolio.transHis.exportData')}
          </LoadingButton>
          <Box flex="1 1 100%" sx={{ mb: 1 }}></Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ExportTransactionHistoryModal;
