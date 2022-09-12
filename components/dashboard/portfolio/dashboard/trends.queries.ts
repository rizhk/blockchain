import { portfolioApi } from 'api/portfolio-api';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { GetTrendsResponse } from 'types/portfolio';

export const useTrendsQuery = () => {
  const { t } = useTranslation();

  const queryInfo = useQuery<GetTrendsResponse, Error>(['getTrends'], () =>
    portfolioApi.getTrends({
      defaultErrorMessage: t('portfolio.dashboard.getTrendsError'),
    }),
  );
  return queryInfo;
};
