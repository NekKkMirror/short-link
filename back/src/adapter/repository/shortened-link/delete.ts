import { Prisma } from '@prisma/client';

import { IShortenedLink } from '@/domain/entity/shortened-link';
import { AdapterParams, UnknownTx } from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>;

export type Delete = (
  data: Prisma.ShortenedLinkDeleteArgs,
  tx?: UnknownTx,
) => Promise<IShortenedLink | never>;

export const buildDelete = ({ db }: Params): Delete => {
  return async (data, tx) => db.getContextClient(tx).shortenedLink.delete(data);
};
