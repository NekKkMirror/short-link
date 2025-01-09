import { UseCaseParams } from '@/domain/usecase/types';
import { IShortenedLinkResponse, IShortenedLinkShortUrl } from '@/domain/entity/shortened-link';
import { NotFoundError } from '@/domain/errors';

export type Info = (payload: IShortenedLinkShortUrl) => Promise<IShortenedLinkResponse | never>;

export const buildInfo = ({ adapter: { shortenedLinkRepository } }: UseCaseParams): Info => {
  return async ({ shortUrl }) => {
    const link = await shortenedLinkRepository.get({
      where: { shortUrl },
      select: {
        originalUrl: true,
        createdAt: true,
        clickCount: true,
      },
    });

    if (!link) {
      throw new NotFoundError({
        code: 'NOT_FOUND',
        message: `Short URL "${shortUrl}" not found.`,
      });
    }

    return link;
  };
};
