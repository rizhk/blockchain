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
  Chip,
  FormHelperText,
} from '@mui/material';
import { portfolioApi } from 'api/portfolio-api';
import { Divider } from 'components/common/divider';
import { LoadingButton } from 'components/common/loading-button';
import { TextButton } from 'components/common/text-button';
import useFetch from 'hooks/use-fetch';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { saveAs } from 'file-saver';
import { FormikProvider, useFormik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import useMutation from 'hooks/use-mutation';
import { Plus } from 'icons/plus';
import { Check } from 'icons/check';

export interface IAddNoteModalProps {
  isShowing: boolean;
  hide: () => void;
  note: string | undefined;
  txnId: string | undefined;
  setTransactionHistoryNote: (txnId: string, note: string) => void;
}

const AddNoteModal = ({ isShowing, hide, note, txnId, setTransactionHistoryNote }: IAddNoteModalProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    hide();
    document.body.style.overflow = 'auto';
  };

  const { i18n, t } = useTranslation();

  const {
    isSuccess: isSetNoteSuccess,
    loading: isSettingNote,
    error: setNoteError,
    mutate: setTransactionNote,
    data: setNoteData,
  } = useMutation((body: { txnId: string; note: string }) => {
    return portfolioApi.updateTransaction(body, {
      defaultErrorMessage: t('portfolio.transHis.setNoteError'),
    });
  });

  const formik = useFormik({
    initialValues: { note: note },
    validationSchema: Yup.object({
      note: Yup.string().max(255).required('Note is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      await setTransactionNote({ txnId: txnId as string, note: values.note as string });
    },
  });

  React.useEffect(() => {
    formik.setFieldValue('note', note);
  }, [note]);

  React.useEffect(() => {
    if (isSetNoteSuccess) {
      setTransactionHistoryNote(setNoteData?.item?.id as string, setNoteData?.item?.note as string);
      handleClose();
    }
  }, [isSetNoteSuccess]);

  return (
    <Dialog key={txnId} fullScreen={fullScreen} open={isShowing} onClose={handleClose}>
      <DialogContent sx={{ width: 480 }}>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={{ mx: 1, mb: 2 }} variant="h6" component="h2">
                {note ? t('portfolio.transHis.editNote') : t('portfolio.transHis.addNote')}
              </Typography>
            </Grid>
            <Box flex="1 1 100%" sx={{ mb: 2 }}></Box>
          </Grid>

          <Grid item xs={12}>
            <Box flex="1 1 100%" sx={{ mb: 1 }}></Box>
            <TextField
              error={Boolean(formik.touched.note && formik.errors.note)}
              name="note"
              fullWidth
              type="text"
              multiline
              rows={3}
              maxRows={5}
              onBlur={formik.handleBlur}
              value={formik.values.note}
              onChange={formik.handleChange}
              label={t('portfolio.transHis.enterNote')}
            />
          </Grid>
          <Grid justifyContent="space-between" alignItems="center" container item xs={12}>
            <Box flex="1 1 100%" sx={{ mt: 2 }}></Box>
            <Typography
              onClick={() => {
                hide();
              }}
              variant="caption2"
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              {t('portfolio.transHis.cancel')}
            </Typography>

            <LoadingButton type="submit" loading={isSettingNote} variant="contained" color="info">
              {t('portfolio.transHis.save')}
            </LoadingButton>
          </Grid>
          {!isSetNoteSuccess && setNoteError && (
            <Grid alignItems="flex-start" container item xs={12}>
              <Box flex="1 1 100%" sx={{ mb: 1 }}></Box>
              <FormHelperText error>{setNoteError}</FormHelperText>
            </Grid>
          )}
          <Box flex="1 1 100%" sx={{ mb: 1 }}></Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteModal;
