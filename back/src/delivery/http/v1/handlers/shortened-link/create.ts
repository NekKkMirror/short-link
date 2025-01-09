import { Request, Response } from 'express';

import { DeliveryParams } from '@/delivery/types';
import { IShortenedLinkCreate } from '@/domain/entity/shortened-link';

type Params = Pick<DeliveryParams, 'shortenedLink'>;

export type Create = (req: Request, res: Response) => Promise<Response>;

export const buildCreate = ({ shortenedLink }: Params): Create => {
  return async (req, res) => {
    const { originalUrl, alias, expiresAt } = <IShortenedLinkCreate>req.body;

    const result = await shortenedLink.create({
      alias,
      originalUrl,
      expiresAt,
    });

    return res.status(201).json(result);
  };
};
