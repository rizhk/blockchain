import { Grid, Typography, Button } from '@mui/material';
import { t } from 'i18next';
import Link from 'next/link';
import { FC } from 'react';

export const NoWalletCTA: FC = () => (
  <Grid container alignItems="center" justifyContent="center">
    <Grid
      item
      component={Typography}
      flex="1 1 100%"
      sx={{ mx: 2, my: 4, maxWidth: '300px' }}
      display="block"
      textAlign="center"
      variant="ctaText1"
    >
      {t('portfolio.dashboard.noWalletActivitiesCtaText')}
    </Grid>
    <Grid container item flex="1 1 100%" justifyContent="center">
      <Link href="/dashboard/portfolio/wallet/" passHref>
        <Button type="button" variant="contained" color="primary" sx={{ mb: 4 }}>
          {t('portfolio.dashboard.addWalletNow')}
        </Button>
      </Link>
    </Grid>
  </Grid>
);
