import { Request, Response } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'shortenedLink'>;

export type Info = (req: Request, res: Response) => Promise<Response>;

export const buildInfo = ({ shortenedLink }: Params): Info => {
  return async (req, res) => {
    const { shortUrl } = req.params;

    const info = await shortenedLink.info({ shortUrl });

    return res.status(200).json(info);
  };
};
