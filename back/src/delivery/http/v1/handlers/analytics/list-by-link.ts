import { Request, Response } from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'analytics'>;

export type ListByLink = (req: Request, res: Response) => Promise<Response>;

export const buildListByLink = ({ analytics }: Params): ListByLink => {
  return async (req, res) => {
    const { shortUrl } = req.params;

    const info = await analytics.listByLink({ shortUrl });

    return res.status(200).json(info);
  };
};
