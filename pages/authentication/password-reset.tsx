import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, FormHelperText, Grid, Link, TextField, Typography } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { AuthBanner } from '../../components/authentication/auth-banner';
import { AmplifyPasswordReset } from '../../components/authentication/amplify-password-reset';
import { Logo } from '../../components/logo';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useMounted } from 'hooks/use-mounted';
import { authApi } from 'api/auth-api';
import { useState } from 'react';

const PasswordReset: NextPage = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { disableGuard, key } = router.query;
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8).max(255).required('Password is required'),
      confirmPassword: Yup.string()
        .min(8)
        .max(255)
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        console.log('on submit');
        await authApi.resetPassword(key as string, values.password);

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
        <title>Set a new password | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
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
                      Set a new password
                    </Typography>
                    <Typography mb={3}>
                      Please create a new pasword. Your password must be different from a previous password. It must
                      also include at least one number, one capital letter and one special character.
                    </Typography>
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Create new password"
                        margin="normal"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                      />
                      <TextField
                        error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        fullWidth
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        label="Re-type the new password"
                        margin="normal"
                        name="confirmPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.confirmPassword}
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
                          Reset password
                        </LoadingButton>
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
                      Password has been reset!
                    </Typography>
                    <Typography mb={3}>
                      Your new password has been set successfully. Click on the button below to login.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <LoadingButton
                        href="/authentication/login"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Login now
                      </LoadingButton>
                    </Box>
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

PasswordReset.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordReset;
