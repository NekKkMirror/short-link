import { GoneError, NotFoundError } from '@/domain/errors';
import { IShortenedLinkPrepareRedirect } from '@/domain/entity/shortened-link';

import { UseCaseParams } from '../types';

export type PrepareRedirect = (payload: IShortenedLinkPrepareRedirect) => Promise<string>;

export const buildPrepareRedirect = ({
  service,
  adapter: { shortenedLinkRepository },
}: UseCaseParams): PrepareRedirect => {
  return async (payload) => {
    const { shortUrl } = payload;
    const link = await shortenedLinkRepository.get({
      where: { shortUrl },
    });

    if (!link) {
      throw new NotFoundError({
        code: 'NOT_FOUND',
        message: `Short URL "${shortUrl}" not found.`,
      });
    }
    if (link.expiresAt && link.expiresAt < new Date()) {
      await shortenedLinkRepository.delete({ where: { shortUrl } });

      throw new GoneError({
        code: 'GONE',
        message: `Short URL ${shortUrl} has expired create new one.`,
      });
    }

    await service.shortenedLink.addClick(payload);

    return link.originalUrl;
  };
};
