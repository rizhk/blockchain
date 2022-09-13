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
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { useTranslation } from 'react-i18next';
import { AvatarEditorDialog } from 'components/dashboard/account/avatar-editor-modal';
import { FormikProvider, useFormik } from 'formik';
import { useMounted } from 'hooks/use-mounted';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import dynamic from 'next/dynamic';
import { authApi } from 'api/auth-api';
import { nameInitials } from 'utils/profile';
import { PasswordCheck } from 'components/authentication/password-check';

const PasswordChecklist = dynamic(() => import('react-password-checklist'), {
  ssr: false,
});

const Account: NextPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const isMounted = useMounted();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);

  const [isValid, setIsValid] = useState(false);

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
        alert('File too big');
        return;
      }

      var _URL = window.URL || window.webkitURL;

      const image = new Image();
      image.src = _URL.createObjectURL(file);
      image.onload = () => {
        const height = image.naturalHeight;
        const width = image.naturalWidth;

        if (height < 200 || width < 200) {
          alert('Dimension too small');
          return;
        } else {
          setImage(file);
          setOpen(true);
        }
      };
    }
  };

  const formik = useFormik({
    initialValues: {
      full_name: user?.full_name,
      current_password: '',
      password: '',
      confirmPassword: '',
      submit: null,
      success: false,
    },
    validationSchema: Yup.object({
      full_name: Yup.string().min(3).max(255).required('Name is required'),
      current_password: Yup.string().required('Password is required'),
      password: Yup.string().min(8).max(255).required('Password is required'),
      confirmPassword: Yup.string()
        .min(8)
        .max(255)
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null]),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        if (!isValid) return;

        const result = await authApi.updateUser({
          current_password: values.current_password,
          new_password: values.password,
          new_password_confirmation: values.confirmPassword,
          full_name: values.full_name,
        });

        if (isMounted()) {
          helpers.setStatus({ success: true });
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
        <title>Dashboard: My account | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Collapse in={open && !formik.values.success}>
          <Alert icon={false} severity="success">
            {t('account.updateSuccess')}
          </Alert>
        </Collapse>
        <Container>
          <Typography variant="h6">Manage your account</Typography>
          <Box sx={{ mt: 4, maxWidth: '690px' }}>
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ pl: 3, py: 2 }}>
                  <Typography variant="overline" color="textSecondary">{`${t('account.photo')}`}</Typography>
                </Box>
                <Box
                  sx={{
                    px: 3,
                    pt: 1,
                    pb: 2,
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Avatar
                    src={user?.profile_pic_url}
                    sx={{
                      height: 100,
                      mr: 2,
                      width: 100,
                      bgcolor: '#BDBDBD',
                    }}
                  >
                    <Typography variant="h4">{nameInitials(user)}</Typography>
                  </Avatar>
                  <Box>
                    <input type="file" hidden id="avatar" onChange={handleNewImage} accept="image/jpeg,image/png" />
                    <Button variant="contained" color="info" onClick={selectFile}>
                      Upload photo
                    </Button>
                    <Typography variant="body2" color="textSecondary" sx={{ pt: 2 }}>
                      Please upload JPG or PNG only
                      <br />
                      Maximum size of 800KB
                      <br />
                      Minimum dimension of 200 x 200px
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <FormikProvider value={formik}>
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Box sx={{ pl: 3, py: 2 }}>
                      <Typography variant="overline" color="textSecondary">{`${t('account.displayName')}`}</Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        pb: 4,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        error={Boolean(formik.touched.full_name && formik.errors.full_name)}
                        helperText={formik.touched.full_name && formik.errors.full_name}
                        label={t('account.changeName')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.full_name}
                        sx={{
                          flexGrow: 1,
                        }}
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ pl: 3, py: 2 }}>
                      <Typography variant="overline" color="textSecondary">{`${t(
                        'account.updatePassword',
                      )}`}</Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        pb: 4,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        label={t('account.currentPassword')}
                        sx={{
                          flexGrow: 1,
                        }}
                      />
                    </Box>
                    <Box sx={{ px: 3 }}>
                      <PasswordCheck
                        formik={formik}
                        setValid={setIsValid}
                        passwordLabel={t('account.newPassword')}
                        confirmPasswordLabel={t('account.passwordAgain')}
                      />
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        pb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <LoadingButton loading={formik.isSubmitting} type="submit" variant="contained" color="info">
                        {t('account.save')}
                      </LoadingButton>
                    </Box>
                    {formik.errors.submit && (
                      <Box sx={{ mt: 3 }}>
                        <FormHelperText error>{formik.errors.submit}</FormHelperText>
                      </Box>
                    )}
                  </form>
                </FormikProvider>
              </CardContent>
            </Card>
          </Box>
          <AvatarEditorDialog open={open} image={image} handleClose={() => setOpen(false)} />
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Account;
