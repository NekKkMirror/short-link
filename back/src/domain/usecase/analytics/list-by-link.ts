import { IAnalyticsList } from '@/domain/entity/analytics';
import { UseCaseParams } from '@/domain/usecase/types';
import { IShortenedLinkShortUrl } from '@/domain/entity/shortened-link';

export type ListByLink = (
  payload: IShortenedLinkShortUrl,
) => Promise<IAnalyticsList | null | never>;

export const buildListByLink = ({
  adapter: { analyticsRepository },
}: UseCaseParams): ListByLink => {
  return async ({ shortUrl }) =>
    analyticsRepository.listByLink({
      where: { link: { shortUrl } },
      orderBy: { clickedAt: 'desc' },
      take: 5,
    });
};
