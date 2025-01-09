import { AdapterParams } from '@/adapter/types';

import { buildCreate, Create } from './create';
import { buildListByLink, ListByLink } from './list-by-link';

type Params = Pick<AdapterParams, 'db'>;

export type AnalyticsRepository = {
  create: Create;
  listByLink: ListByLink;
};
export const buildAnalyticsRepository = (params: Params): AnalyticsRepository => {
  const create = buildCreate(params);
  const listByLink = buildListByLink(params);

  return {
    create,
    listByLink,
  };
};
