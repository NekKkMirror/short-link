import { Request, Response } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'shortenedLink'>;

export type Delete = (req: Request, res: Response) => Promise<Response>;

export const buildDelete = ({ shortenedLink }: Params): Delete => {
  return async (req, res) => {
    const { shortUrl } = req.params;

    await shortenedLink.delete({ shortUrl });

    return res.status(204).send();
  };
};
