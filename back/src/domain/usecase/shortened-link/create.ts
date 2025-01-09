import { UseCaseParams } from '@/domain/usecase/types';
import { InvalidDataError } from '@/domain/errors';
import { IShortenedLinkCreate, IShortenedLinkResponse } from '@/domain/entity/shortened-link';

export type Create = (
  payload: IShortenedLinkCreate,
) => Promise<IShortenedLinkResponse | null | never>;

export const buildCreate = ({ service }: UseCaseParams): Create => {
  return async (payload) => {
    const { alias } = payload;

    if (alias) {
      const isLinkExists = await service.shortenedLink.check({ shortUrl: alias });

      if (isLinkExists) {
        throw new InvalidDataError({
          code: 'BAD_REQUEST',
          message: `Short URL with alias "${alias}" already exists.`,
        });
      }
    }

    return service.shortenedLink.create(payload);
  };
};
