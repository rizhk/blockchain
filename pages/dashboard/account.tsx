import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { gtm } from '../../lib/gtm';
import { useAuth } from 'hooks/use-auth';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { useTranslation } from 'react-i18next';

const Account: NextPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

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
        <Container maxWidth="md">
          <Typography variant="h6">Manage your account</Typography>
          <Box sx={{ mt: 4 }}>
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
                    src={user.avatar}
                    sx={{
                      height: 100,
                      mr: 2,
                      width: 100,
                      bgcolor: '#BDBDBD',
                    }}
                  >
                    <Typography variant="h4">
                      {user.full_name.split(' ')[0][0]}
                      {user.full_name.split(' ')[1][0]}
                    </Typography>
                  </Avatar>
                  <Box>
                    <Button variant="contained" color="info">
                      Upload photo
                    </Button>
                    <Typography variant="body2" color="textSecondary" sx={{ pt: 2 }}>
                      Please upload JPG, GIF or PNG only. <br></br>Maximum size of 600KB
                    </Typography>
                  </Box>
                </Box>
                <Divider />
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
                    defaultValue={user.full_name}
                    label={t('account.changeName')}
                    sx={{
                      flexGrow: 1,
                    }}
                  />
                </Box>
                <Divider />
                <Box sx={{ pl: 3, py: 2 }}>
                  <Typography variant="overline" color="textSecondary">{`${t('account.updatePassword')}`}</Typography>
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
                <Box
                  sx={{
                    px: 3,
                    pb: 4,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    label={t('account.newPassword')}
                    sx={{
                      flexGrow: 1,
                    }}
                  />
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
                    label={t('account.passwordAgain')}
                    sx={{
                      flexGrow: 1,
                    }}
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
                  <Button variant="contained" color="info">
                    {t('account.save')}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
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
