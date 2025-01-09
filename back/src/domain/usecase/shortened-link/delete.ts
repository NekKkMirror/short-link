import { UseCaseParams } from '@/domain/usecase/types';
import { IShortenedLinkShortUrl } from '@/domain/entity/shortened-link';
import { NotFoundError } from '@/domain/errors';

export type Delete = (payload: IShortenedLinkShortUrl) => Promise<void | null | never>;

export const buildDelete = ({
  adapter: { shortenedLinkRepository },
  service,
}: UseCaseParams): Delete => {
  return async ({ shortUrl }) => {
    const link = await service.shortenedLink.check({ shortUrl });

    if (!link) {
      throw new NotFoundError({
        code: 'NOT_FOUND',
        message: `Short URL "${shortUrl}" not found.`,
      });
    }

    await shortenedLinkRepository.delete({
      where: { shortUrl },
    });
  };
};
