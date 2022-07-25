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

export interface IAddTagModalProps {
  isShowing: boolean;
  hide: () => void;
  tag: string | undefined;
  txnId: string | undefined;
  getTransactionHistory: () => void;
}

const AddTagModal = ({ isShowing, hide, tag, txnId, getTransactionHistory }: IAddTagModalProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = (event: React.ChangeEvent<HTMLButtonElement>, reason: string) => {
    hide();
    document.body.style.overflow = 'auto';
  };

  const { i18n, t } = useTranslation();

  const [isAddMode, setIsAddMode] = useState(false);

  const { data: tagsData, trigger: triggerGetTags } = useFetch(() => {
    return portfolioApi.getUserTags({ defaultErrorMessage: t('portfolio.transHis.getUserTagsError') });
  }, []);

  const {
    isSuccess: isCreateTagSuccess,
    loading: isCreatingTag,
    error: createTagError,
    mutate: createTransactionTag,
  } = useMutation((body) => {
    return portfolioApi.createTransactionTag(body, {
      defaultErrorMessage: t('portfolio.transHis.createUserTagsError'),
    });
  });

  const {
    isSuccess: isSetTagSuccess,
    loading: isSettingTag,
    error: setTagError,
    mutate: setTransactionTag,
  } = useMutation((body) => {
    return portfolioApi.updateTransaction(body, {
      defaultErrorMessage: t('portfolio.transHis.setTagError'),
    });
  });

  const formik = useFormik({
    initialValues: { name: undefined },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required('Name is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      await createTransactionTag({ name: values.name });
    },
  });

  const handleClickTag = async (id: string) => {
    await setTransactionTag({ txnId, tag_id: id });
  };

  React.useEffect(() => {
    if (isCreateTagSuccess) {
      triggerGetTags();
      setIsAddMode(false);
    }
  }, [isCreateTagSuccess]);

  React.useEffect(() => {
    if (isSetTagSuccess) {
      getTransactionHistory();
    }
  }, [isSetTagSuccess]);

  return (
    <Dialog key={txnId} fullScreen={fullScreen} open={isShowing} onClose={handleClose}>
      <DialogContent sx={{ width: 480 }}>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={{ mx: 1, mb: 2 }} variant="h6" component="h2">
                {t('portfolio.transHis.selectTag')}
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              {tagsData?.items?.map(({ id, name }) => {
                return (
                  <Chip
                    onClick={() => handleClickTag(id)}
                    sx={{ mr: 1.5, mb: 1.5, cursor: 'pointer' }}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {name}
                        {name === tag && <Check sx={{ pl: 0.5, fontSize: '1rem' }} />}
                      </Box>
                    }
                    key={id}
                    variant="outlined"
                    size="small"
                  />
                );
              })}
            </Grid>{' '}
            <Box flex="1 1 100%" sx={{ mb: 2 }}></Box>
          </Grid>
          {isAddMode && (
            <>
              <Grid item xs={12}>
                {' '}
                <Box flex="1 1 100%" sx={{ mb: 1 }}></Box>
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  name="name"
                  fullWidth
                  type="text"
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  label={t('portfolio.transHis.enterNameForTag')}
                />
              </Grid>
            </>
          )}
          <Grid justifyContent="space-between" alignItems="center" container item xs={12}>
            <Box flex="1 1 100%" sx={{ mt: 2 }}></Box>
            <Typography
              onClick={() => {
                isAddMode ? setIsAddMode(false) : hide();
              }}
              variant="caption2"
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              {t('portfolio.transHis.cancel')}
            </Typography>
            {!isAddMode && (
              <Typography
                component={Grid}
                display="flex"
                alignItems="center"
                onClick={() => {
                  setIsAddMode(true);
                }}
                variant="caption2"
                sx={{ cursor: 'pointer' }}
              >
                <Plus />
                {t('portfolio.transHis.addNew')}
              </Typography>
            )}
            {isAddMode && (
              <LoadingButton type="submit" loading={isCreatingTag} variant="contained" color="info">
                <Plus />
                {t('portfolio.transHis.addTag')}
              </LoadingButton>
            )}
          </Grid>
          {!isCreateTagSuccess && createTagError && (
            <Grid alignItems="flex-start" container item xs={12}>
              <Box flex="1 1 100%" sx={{ mb: 1 }}></Box>
              <FormHelperText error>{createTagError}</FormHelperText>
            </Grid>
          )}
          {!isSetTagSuccess && setTagError && (
            <Grid alignItems="flex-start" container item xs={12}>
              <Box flex="1 1 100%" sx={{ mb: 1 }}></Box>
              <FormHelperText error>{setTagError}</FormHelperText>
            </Grid>
          )}
          <Box flex="1 1 100%" sx={{ mb: 1 }}></Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTagModal;
