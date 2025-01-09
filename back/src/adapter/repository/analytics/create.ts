import { Prisma } from '@prisma/client';

import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IAnalytics } from '@/domain/entity/analytics';

type Params = Pick<AdapterParams, 'db'>;

export type Create = (
  data: Prisma.AnalyticsCreateArgs,
  tx?: UnknownTx,
) => Promise<IAnalytics | never>;

export const buildCreate = ({ db }: Params): Create => {
  return async (data, tx) => db.getContextClient(tx).analytics.create(data);
};
