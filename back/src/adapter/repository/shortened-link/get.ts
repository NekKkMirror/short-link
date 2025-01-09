import { Prisma } from '@prisma/client';

import { AdapterParams } from '@/adapter/types';
import { IShortenedLink } from '@/domain/entity/shortened-link';

type Params = Pick<AdapterParams, 'db'>;

export type Get = (
  params: Prisma.ShortenedLinkFindFirstArgs,
) => Promise<IShortenedLink | null | never>;

export const buildGet = ({ db }: Params): Get => {
  return async (getParams) => db.client.shortenedLink.findFirst(getParams);
};
