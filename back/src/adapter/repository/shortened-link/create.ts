import { Prisma } from '@prisma/client';

import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IShortenedLink } from '@/domain/entity/shortened-link';

type Params = Pick<AdapterParams, 'db'>;

export type Create = (
  data: Prisma.ShortenedLinkCreateArgs,
  tx?: UnknownTx,
) => Promise<IShortenedLink | never>;
export const buildCreate = ({ db }: Params): Create => {
  return async (data, tx) => db.getContextClient(tx).shortenedLink.create(data);
};
