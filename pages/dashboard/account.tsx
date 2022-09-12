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
import { AvatarEditorDialog } from '../../components/dashboard/account/avatar-editor-modal';

const Account: NextPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);

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
                    src={user.profile_pic_url}
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
