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
import { TransitionLayout } from 'components/common/transition-layout';
import { useTranslation } from 'react-i18next';

const AccountInit: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleClickPersonalAccount = () => {
    router.push('/dashboard');
  };
  const handleClickBusinessAccount = () => {
    router.push('/dashboard');
  };

  return (
    <TransitionLayout>
      <Head>
        <title>
          {t('signup.accountInit.title')} | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
        </title>
      </Head>
      <Grid
        sx={{
          position: 'absolute',
          zIndex: 2,
        }}
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: 'primary.contrastText', fontSize: '32px', fontWeight: '700' }}>
            {t('signup.accountInit.cta')}
          </Typography>
          <Typography sx={{ pb: 8, color: 'primary.contrastText', fontSize: '20px', fontWeight: '500' }}>
            ({t('signup.accountInit.selectOne')})
          </Typography>
          <Grid container flexWrap="nowrap" columnSpacing={8}>
            <Grid item>
              <Grid
                onClick={handleClickBusinessAccount}
                component={Card}
                flexDirection="column"
                sx={{ cursor: 'pointer' }}
              >
                <Box sx={{ pt: 4 }} component="img" alt="BusinessAccount" src={'/static/icons/business_account.svg'} />
                <Grid item sx={{ pb: 3 }}>
                  <Typography variant="overline" sx={{ fontSize: '20px', fontWeight: 400 }}>
                    {t('signup.accountInit.business')}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                onClick={handleClickBusinessAccount}
                sx={{ pt: 2, color: 'primary.contrastText', fontSize: '20px', cursor: 'pointer' }}
              >
                {t('signup.accountInit.forBusiness')}
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                onClick={handleClickPersonalAccount}
                component={Card}
                flexDirection="column"
                sx={{ cursor: 'pointer' }}
              >
                <Box sx={{ pt: 4 }} component="img" alt="PersonalAccount" src={'/static/icons/personal_account.svg'} />
                <Grid item sx={{ pb: 3 }}>
                  <Typography variant="overline" sx={{ fontSize: '20px', fontWeight: 400 }}>
                    {t('signup.accountInit.personal')}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                onClick={handleClickPersonalAccount}
                sx={{ pt: 2, color: 'primary.contrastText', fontSize: '20px', cursor: 'pointer' }}
              >
                {t('signup.accountInit.forPersonal')}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            onClick={() => router.push('/dashboard')}
            sx={{
              mt: 16,
              color: 'primary.contrastText',
              fontSize: '18px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {t('signup.accountInit.skip')}
          </Typography>
        </Grid>
      </Grid>
    </TransitionLayout>
  );
};

AccountInit.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default AccountInit;
