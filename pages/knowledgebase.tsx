import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';

import { gtm } from '../lib/gtm';
import { DashboardLayout } from 'components/dashboard/dashboard-layout';

const Knowledgebase: NextPage = () => {
  return (
    <DashboardLayout>
      <Typography variant="h2" sx={{ m: 10 }}>
        Knowledge base
      </Typography>
    </DashboardLayout>
  );
};

export default Knowledgebase;
