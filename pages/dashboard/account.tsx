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

enum AccountAction {
  INFO_UPDATE_SUCCESS,
  AVATAR_FILE_TOO_LARGE,
  AVATAR_UPDATE_SUCCESS,
}

const actionTranslationKey = (action: AccountAction) => {
  switch (action) {
    case AccountAction.INFO_UPDATE_SUCCESS:
      return 'account.updateSuccess';
    case AccountAction.AVATAR_FILE_TOO_LARGE:
      return 'account.tooLarge';
    case AccountAction.AVATAR_UPDATE_SUCCESS:
      return 'account.avatarUpdateSuccess';
  }
};

const Account: NextPage = () => {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();
  const isMounted = useMounted();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);

  const [isValid, setIsValid] = useState(false);

  const [recentAction, setRecentAction] = useState<AccountAction>();

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
        setRecentAction(AccountAction.AVATAR_FILE_TOO_LARGE);
        return;
      }

      var _URL = window.URL || window.webkitURL;

      const image = new Image();
      image.src = _URL.createObjectURL(file);
      image.onload = () => {
        const height = image.naturalHeight;
        const width = image.naturalWidth;

        if (height < 200 || width < 200) {
          setRecentAction(AccountAction.AVATAR_FILE_TOO_LARGE);
          return;
        } else {
          setImage(file);
          setOpen(true);
        }
      };
    }
  };

  const handleClose = (success?: boolean) => {
    setOpen(false);
    if (success) {
      setRecentAction(AccountAction.AVATAR_UPDATE_SUCCESS);
    } else if (success == false) {
      setRecentAction(AccountAction.AVATAR_FILE_TOO_LARGE);
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
      current_password: Yup.string().when('password', {
        is: (value: string) => value && value.length > 0,
        then: Yup.string().required('Curent password is required'),
      }),
      password: Yup.string().min(8).max(255),
      confirmPassword: Yup.string()
        .min(8)
        .max(255)
        .when('password', {
          is: (value: string) => value && value.length > 0,
          then: Yup.string().required('Confirm password is required'),
        })
        .oneOf([Yup.ref('password'), null]),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        if (values.current_password && !isValid) return;

        const result = await authApi.updateUser({
          current_password: values.current_password,
          new_password: values.password,
          new_password_confirmation: values.confirmPassword,
          full_name: values.full_name,
        });

        if (isMounted()) {
          helpers.setStatus({ success: true });
          setRecentAction(AccountAction.INFO_UPDATE_SUCCESS);
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
          Dashboard: {`${t('menu.account')}`} | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
        </title>
      </Head>
      <Collapse in={recentAction != null || (formik.errors.submit != undefined && formik.errors.submit.length > 0)}>
        <Alert
          icon={false}
          severity={
            recentAction != AccountAction.AVATAR_FILE_TOO_LARGE && formik.errors.submit == undefined
              ? 'success'
              : 'error'
          }
        >
          {formik.errors.submit ? formik.errors.submit : t(actionTranslationKey(recentAction!))}
        </Alert>
      </Collapse>
      <Box component="main">
        <Container maxWidth="lg">
          <Box sx={{ my: 3 }}>
            <Grid container justifyContent="space-between" flexWrap="nowrap" alignItems="center">
              <Grid container item minWidth="fit-content">
                <Typography variant="h6" className="pageTitle">
                  {t('account.title')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 4, maxWidth: '600px' }}>
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ pl: 3, py: 2 }}>
                  <Typography variant="overline" color="textSecondary">{`${t('account.photo')}`}</Typography>
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
                  <Avatar
                    src={user?.profile_pic_url}
                    sx={{
                      mx: 2,
                      height: 100,
                      width: 100,
                      bgcolor: '#BDBDBD',
                    }}
                  >
                    <Typography variant="h4">{nameInitials(user)}</Typography>
                  </Avatar>
                  <Box sx={{ mx: 2 }}>
                    <input type="file" hidden id="avatar" onChange={handleNewImage} accept="image/jpeg,image/png" />
                    {user?.profile_pic_url != '' ? (
                      <Box>
                        <Button variant="contained" color="info" onClick={selectFile} sx={{ mr: 1 }}>
                          Change photo
                        </Button>
                        {/* <Button variant="contained" color="inherit">
                          Remove
                        </Button> */}
                      </Box>
                    ) : (
                      <Button variant="contained" color="info" onClick={selectFile}>
                        Upload photo
                      </Button>
                    )}
                    <Typography variant="body2" color="textSecondary" sx={{ pt: 2, fontSize: 12 }}>
                      Please upload JPG or PNG only. Maximum size of 2MB, minimum dimension of 200 x 200px
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
                        pb: 3,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        error={Boolean(formik.touched.full_name && formik.errors.full_name)}
                        helperText={formik.touched.full_name && formik.errors.full_name}
                        label={t('account.changeName')}
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
                      <Typography variant="overline" color="textSecondary">{`${t(
                        'account.updatePassword',
                      )}`}</Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        error={Boolean(formik.touched.current_password && formik.errors.current_password)}
                        helperText={formik.touched.current_password && formik.errors.current_password}
                        label={t('account.currentPassword')}
                        type="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        margin="normal"
                        name="current_password"
                        value={formik.values.current_password}
                        fullWidth
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
          <AvatarEditorDialog open={open} image={image} handleClose={handleClose} />
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
