import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { AuthGuard } from 'components/authentication/auth-guard';
import { DashboardLayout } from 'components/dashboard/dashboard-layout';
import { gtm } from 'lib/gtm';
import { useAuth } from 'hooks/use-auth';
import { useTranslation } from 'react-i18next';
import { AvatarEditorDialog } from 'components/dashboard/account/avatar-editor-modal';
import { FormikProvider, useFormik } from 'formik';
import { useMounted } from 'hooks/use-mounted';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { authApi } from 'api/auth-api';
import { PhotoEditorDialog } from 'components/dashboard/portfolio/photo-edit-dialog';
import { CurrencySelector } from 'components/dashboard/portfolio/currency-selector';
import { portfolioApi } from 'api/portfolio-api';

const CreatePortfolio: NextPage = () => {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const isMounted = useMounted();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [newImage, setNewImage] = useState<string>('');
  const [file, setFile] = useState<Blob | null>(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const selectFile = () => {
    const fileElem = document.getElementById('avatar');
    if (fileElem) {
      fileElem.click();
    }
  };

  const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size / 1024 > 800) {
        formik.setErrors({ submit: t('account.tooLarge') });
        return;
      }

      var _URL = window.URL || window.webkitURL;

      const image = new Image();
      image.src = _URL.createObjectURL(file);
      image.onload = () => {
        const height = image.naturalHeight;
        const width = image.naturalWidth;

        if (height < 200 || width < 200) {
          formik.setErrors({ submit: t('account.tooLarge') });
          return;
        } else {
          setImage(file);
          setOpen(true);
        }
      };
    }
  };

  const handleClose = (url: string, file: Blob) => {
    setOpen(false);
    setFile(file);
    setNewImage(url);
  };

  const formik = useFormik({
    initialValues: {
      full_name: '',
      currency: 'USD',
      submit: null,
      success: false,
    },
    validationSchema: Yup.object({
      full_name: Yup.string().min(3).max(255).required('Name is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await portfolioApi.createPortfolio(
          {
            full_name: values.full_name,
            base_currency: values.currency,
            profile_pic: file,
          },
          { defaultErrorMessage: '' },
        );

        if (isMounted()) {
          helpers.setStatus({ success: true });
          formik.setErrors({ submit: undefined });
          await updateUser({});
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: t(`error.${err.message}`) });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <Head>
        <title>
          Dashboard: {`${t('portfolio.add')}`} | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
        </title>
      </Head>
      <Collapse in={!formik.values.success || (formik.errors.submit != undefined && formik.errors.submit.length > 0)}>
        <Alert icon={false} severity={formik.errors.submit == undefined ? 'success' : 'error'}>
          {formik.errors.submit ? formik.errors.submit : t('portfolio.addSuccess')}
        </Alert>
      </Collapse>
      <Box component="main">
        <Container maxWidth="lg">
          <Box sx={{ my: 3 }}>
            <Grid container justifyContent="space-between" flexWrap="nowrap" alignItems="center">
              <Grid container item minWidth="fit-content">
                <Typography variant="h6" className="pageTitle">
                  {t('portfolio.add')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 4, maxWidth: '600px' }}>
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ pl: 3, py: 2 }}>
                  <Typography variant="overline" color="textSecondary">{`${t('portfolio.photo')}`}</Typography>
                </Box>
                <Box
                  sx={{
                    px: 3,
                    pt: 1,
                    pb: 3,
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <img
                    alt=""
                    src={newImage != '' ? newImage : '/static/portfolio/avatar_placeholder.png'}
                    width={100}
                    height={100}
                    style={{ borderRadius: 16 }}
                  />
                  <Box sx={{ mx: 4 }}>
                    <input type="file" hidden id="avatar" onChange={handleNewImage} accept="image/jpeg,image/png" />
                    <Button variant="contained" color="info" onClick={selectFile}>
                      Upload photo
                    </Button>
                    <Typography variant="body2" color="textSecondary" sx={{ pt: 2, fontSize: 12 }}>
                      Please upload JPG or PNG only. Maximum size of 2MB, minimum dimension of 200 x 200px
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <FormikProvider value={formik}>
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Box sx={{ pl: 3, py: 2 }}>
                      <Typography variant="overline" color="textSecondary">{`${t('portfolio.name')}`}</Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        pb: 3,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        error={Boolean(formik.touched.full_name && formik.errors.full_name)}
                        helperText={formik.touched.full_name && formik.errors.full_name}
                        label={t('portfolio.enterName')}
                        margin="normal"
                        name="full_name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.full_name}
                        fullWidth
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ pl: 3, py: 2 }}>
                      <Typography variant="overline" color="textSecondary">{`${t('portfolio.currency')}`}</Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <CurrencySelector />
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        py: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <LoadingButton
                        loading={formik.isSubmitting}
                        type="submit"
                        variant="contained"
                        color="info"
                        size="large"
                      >
                        {t('account.save')}
                      </LoadingButton>
                    </Box>
                  </form>
                </FormikProvider>
              </CardContent>
            </Card>
          </Box>
          <PhotoEditorDialog open={open} image={image} handleClose={handleClose} />
        </Container>
      </Box>
    </>
  );
};

CreatePortfolio.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreatePortfolio;
