import { Adapter } from '@/domain/types';

export type AddClick = ({
  shortUrl,
  ipAddress,
}: {
  shortUrl: string;
  ipAddress: string;
}) => Promise<void>;

export const buildAddClick = ({
  shortenedLinkRepository,
  analyticsRepository,
}: Adapter): AddClick => {
  return async ({ shortUrl, ipAddress }) => {
    await shortenedLinkRepository.update({
      where: { shortUrl },
      data: {
        clickCount: { increment: 1 },
      },
    });
    await analyticsRepository.create({
      data: {
        ipAddress,
        clickedAt: new Date(),
        link: {
          connect: { shortUrl },
        },
      },
    });
  };
};
