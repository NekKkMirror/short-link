import { UseCaseParams } from '@/domain/usecase/types';

import { buildListByLink, ListByLink } from './list-by-link';

export type AnalyticsUseCase = {
  listByLink: ListByLink;
};

export const buildAnalyticsUseCase = (params: UseCaseParams): AnalyticsUseCase => {
  const listByLink = buildListByLink(params);

  return {
    listByLink,
  };
};
