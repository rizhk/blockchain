import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Card, Container, Divider, FormHelperText, Grid, Link, TextField, Typography } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useMounted } from 'hooks/use-mounted';
import { authApi } from 'api/auth-api';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PasswordRecovery: NextPage = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { disableGuard } = router.query;
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        console.log('on submit');
        await authApi.forgotPassword(values.email);

        if (isMounted()) {
          setSubmitted(true);
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
        <title>Forgot your password? | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
      </Head>
      <Box sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Grid component="main" container spacing={0} sx={{ minHeight: '100vh' }}>
            {!submitted && (
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                  px={12}
                >
                  <Box>
                    <img width={184} src={'/static/logo.png'} />
                    <Typography variant="h4" my={3}>
                      Forgot your password?
                    </Typography>
                    <Typography mb={3}>
                      Enter the email address you used when you joined and we’ll send you instructions to reset your
                      password.
                    </Typography>
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <TextField
                        autoFocus
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Enter your email address"
                        margin="normal"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
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
                          Send reset instructions
                        </LoadingButton>
                      </Box>
                      <Divider sx={{ my: 3 }} />
                      <Box sx={{ display: 'flex' }}>
                        <img
                          style={{ cursor: 'pointer' }}
                          width={16}
                          src={'/static/arrow-narrow-left.svg'}
                          onClick={() => router.push('/authentication/login')}
                        />
                        <NextLink
                          href={
                            disableGuard
                              ? `/authentication/login?disableGuard=${disableGuard}`
                              : '/authentication/login'
                          }
                          passHref
                        >
                          <Link
                            color="secondary.main"
                            variant="body1"
                            sx={{
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                            ml={1}
                            mr={2}
                          >
                            Back to login
                          </Link>
                        </NextLink>
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
                              cursor: 'pointer',
                            }}
                          >
                            Create account
                          </Link>
                        </NextLink>
                      </Box>
                    </form>
                  </Box>
                </Box>
              </Grid>
            )}
            {submitted && (
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                  px={12}
                >
                  <Box>
                    <img width={184} src={'/static/logo.png'} />
                    <Typography variant="h4" my={3}>
                      Check your email
                    </Typography>
                    <Typography mb={3}>
                      We sent a password reset link to your email {formik.values.email}. Please check your email now and
                      click on the link.
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <div>
                      <Typography
                        color="secondary.main"
                        variant="body1"
                        sx={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onClick={() => formik.handleSubmit()}
                      >
                        Didn’t get it? Resend email
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Box
                px={10}
                sx={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  background: 'url("/static/auth/reset-bg.png"), linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <img
                  style={{ marginLeft: 20, marginRight: 20, objectFit: 'contain', height: '260px' }}
                  src={'/static/auth/reset-banner.png'}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

PasswordRecovery.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordRecovery;
