import { createRef, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import * as Yup from 'yup';
import { Field, FormikProvider, useFormik } from 'formik';
import { useMounted } from 'hooks/use-mounted';
import { LoadingButton } from '@mui/lab';
import ReCAPTCHA from 'react-google-recaptcha';
import { recaptchaConfig } from 'config';
import { RecaptchaField } from './recaptcha-field';
import { useTranslation } from 'react-i18next';

const Login: NextPage = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const router = useRouter();
  const { login } = useAuth();
  const { disableGuard } = router.query;
  const recaptchaRef = createRef<ReCAPTCHA>();

  const formik = useFormik({
    initialValues: {
      email:
        process.env.NEXT_PUBLIC_URL?.includes('dev') || process.env.NEXT_PUBLIC_URL?.includes('localhost')
          ? 'demo@picante.io'
          : '',
      password:
        process.env.NEXT_PUBLIC_URL?.includes('dev') || process.env.NEXT_PUBLIC_URL?.includes('localhost')
          ? 'j&gwQwtG15x4'
          : '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        var recaptchaToken = await recaptchaRef.current.executeAsync();
      }
      try {
        await login(values.email, values.password);

        if (isMounted()) {
          const returnUrl = (router.query.returnUrl as string | undefined) || '/dashboard';
          router.push(returnUrl).catch(console.error);
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

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Login | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
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
                    Login
                  </Typography>
                  <FormikProvider value={formik}>
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <TextField
                        autoFocus
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                      />
                      <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                      />
                      <Field
                        recaptchaRef={recaptchaRef}
                        name="recaptchaToken"
                        component={RecaptchaField}
                        siteKey={recaptchaConfig.siteKey}
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
                          Log In
                        </LoadingButton>
                      </Box>
                      <Divider sx={{ my: 3 }} />
                      <div>
                        <NextLink
                          href={
                            disableGuard
                              ? `/authentication/register?disableGuard=${disableGuard}`
                              : '/authentication/register'
                          }
                          passHref
                        >
                          <Link
                            color="secondary.main"
                            variant="body1"
                            sx={{
                              textDecoration: 'underline',
                            }}
                          >
                            Create account
                          </Link>
                        </NextLink>
                        <NextLink
                          href={
                            disableGuard
                              ? `/authentication/password-recovery?disableGuard=${disableGuard}`
                              : '/authentication/password-recovery'
                          }
                          passHref
                        >
                          <Link color="secondary.main" variant="body1" sx={{ textDecoration: 'underline' }} ml={1}>
                            Forgot Password
                          </Link>
                        </NextLink>
                      </div>
                    </form>
                  </FormikProvider>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                px={10}
                sx={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  background: 'url("/static/auth/auth-bg.png"), linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)',
                  backgroundSize: 'cover, auto',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <img
                  style={{ marginLeft: 10, marginRight: 10, objectFit: 'contain', maxHeight: '65vh' }}
                  src={'/static/auth/login-hero-1.png'}
                />
                <Typography color="primary.contrastText" variant="h5" mt={3}>
                  {t('login.heroTitle1')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
