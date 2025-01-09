import { Prisma } from '@prisma/client';

import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IShortenedLink } from '@/domain/entity/shortened-link';

type Params = Pick<AdapterParams, 'db'>;

export type Update = (
  params: Prisma.ShortenedLinkUpdateArgs,
  tx?: UnknownTx,
) => Promise<IShortenedLink | never>;

export const buildUpdate =
  ({ db }: Params): Update =>
  (getParams, tx) =>
    db.getContextClient(tx).shortenedLink.update(getParams);
