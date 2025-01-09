import { Request, Response } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'shortenedLink'>;

export type Redirect = (req: Request, res: Response) => Promise<void>;

export const buildRedirect = ({ shortenedLink }: Params): Redirect => {
  return async (req, res) => {
    const { shortUrl } = req.params;
    const ipAddress = <string>req.ip;
    const originalUrl = await shortenedLink.prepareRedirect({ shortUrl, ipAddress });

    return res.redirect(originalUrl);
  };
};
