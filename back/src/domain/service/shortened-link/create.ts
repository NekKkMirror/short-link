import { Adapter } from '@/domain/types';
import { IShortenedLinkCreate, IShortenedLinkResponse } from '@/domain/entity/shortened-link';

export type Create = (
  payload: IShortenedLinkCreate,
) => Promise<IShortenedLinkResponse | null | never>;

export const buildCreate = ({ shortenedLinkRepository }: Adapter): Create => {
  return async (payload) => {
    const { alias } = payload;
    const shortUrl = alias || Math.random().toString(36).substring(2, 8);

    return shortenedLinkRepository.create({
      data: {
        ...payload,
        shortUrl,
      },
    });
  };
};
