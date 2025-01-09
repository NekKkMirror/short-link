import { Adapter } from '@/domain/types';
import { IShortenedLinkResponse, IShortenedLinkShortUrl } from '@/domain/entity/shortened-link';

export type Check = (
  payload: IShortenedLinkShortUrl,
) => Promise<IShortenedLinkResponse | null | never>;

export const buildCheck = ({ shortenedLinkRepository }: Adapter): Check => {
  return async ({ shortUrl }) => {
    const link = await shortenedLinkRepository.get({
      where: {
        shortUrl,
      },
      select: {
        id: true,
      },
    });

    if (!link) {
      return null;
    }

    return link;
  };
};
