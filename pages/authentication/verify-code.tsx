import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, FormHelperText, Grid, Link, TextField, Typography } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useMounted } from 'hooks/use-mounted';
import { authApi } from 'api/auth-api';
import { useTranslation } from 'react-i18next';

const VerifyCode: NextPage = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const router = useRouter();
  const { updateUser } = useAuth();
  const { disableGuard } = router.query;

  const formik = useFormik({
    initialValues: {
      code: '',
      submit: null,
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Verification code is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await authApi.verify(values.code);
        await updateUser({});

        if (isMounted()) {
          const returnUrl = (router.query.returnUrl as string | undefined) || '/authentication/account-init';
          router.push(returnUrl).catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Verify Email Address | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
      </Head>
      <Box sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xxl" sx={{ padding: { md: '0px 0px 0px 0px' } }}>
          <Grid component="main" container spacing={0} sx={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  alignItems: { xs: 'center', md: 'flex-end' },
                }}
                px={12}
              >
                <Box sx={{ maxWidth: '28rem' }}>
                  <img width={184} src={'/static/logo.png'} />
                  <Typography variant="h4" my={3}>
                    Check your email
                  </Typography>
                  <Typography mb={3} variant="subtitle1">
                    In order complete your registration and to secure your account, we have sent you a code via email.
                    Enter the code below to verify your email address.
                  </Typography>
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                      autoFocus
                      error={Boolean(formik.touched.code && formik.errors.code)}
                      fullWidth
                      helperText={formik.touched.code && formik.errors.code}
                      label="Enter verification code"
                      margin="normal"
                      name="code"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.code}
                    />
                    {formik.errors.submit && (
                      <Box sx={{ mt: 3 }}>
                        <FormHelperText error>{formik.errors.submit}</FormHelperText>
                      </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                      <LoadingButton
                        loading={formik.isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Verify email address
                      </LoadingButton>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <div>
                      <Typography
                        color="secondary.main"
                        variant="body1"
                        sx={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onClick={async () => await authApi.resend()}
                      >
                        Didn’t get it? Resend verification code
                      </Typography>
                    </div>
                  </form>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                px={10}
                sx={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  background: 'url("/static/auth/verify-bg.png"), linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)',
                  backgroundSize: 'cover, auto',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <img
                  style={{ marginLeft: 20, marginRight: 20, objectFit: 'contain', maxHeight: '40vh' }}
                  src={'/static/auth/verify-hero-1.png'}
                />
                <Typography color="primary.contrastText" variant="h5" mt={3}>
                  {t('verify.heroTitle1')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

VerifyCode.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default VerifyCode;
