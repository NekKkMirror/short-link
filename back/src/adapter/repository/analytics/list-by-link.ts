import { Prisma } from '@prisma/client';

import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IAnalyticsList } from '@/domain/entity/analytics';

type Params = Pick<AdapterParams, 'db'>;

export type ListByLink = (
  data: Prisma.AnalyticsFindManyArgs & { where: { link: { shortUrl: string } } },
  tx?: UnknownTx,
) => Promise<IAnalyticsList | never>;

export const buildListByLink = ({ db }: Params): ListByLink => {
  return async (data, tx) => {
    const clicks = await db.getContextClient(tx).analytics.findMany(data);
    const {
      where: {
        link: { shortUrl },
      },
    } = data;
    const count = await db.getContextClient(tx).analytics.count({
      where: { link: { shortUrl } },
    });

    return {
      totalClicks: count,
      recentClicks: clicks.map((click) => ({
        ipAddress: click.ipAddress,
        clickedAt: click.clickedAt,
      })),
    };
  };
};
