import Express from 'express';

import { DeliveryParams } from '@/delivery/types';
import { createRouteHandler } from '@/delivery/http/v1/route-handler';
import { IHandler } from '@/delivery/http/v1/handlers/types';
import { buildListByLink, ListByLink } from '@/delivery/http/v1/handlers/analytics/list-by-link';
import { shortUrlParamRule } from '@/delivery/http/v1/handlers/_common/rules/shortened-link';

type Params = Pick<DeliveryParams, 'analytics'>;

export type ShortenedLinkMethods = {
  listByLink: ListByLink;
};

const buildRegisterRoutes = (methods: ShortenedLinkMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /analytics/list-by-link/{shortUrl}:
     *   get:
     *     tags: [Analytics]
     *     summary: Returns an array of analytics
     *     parameters:
     *       - in: path
     *         name: shortUrl
     *         required: true
     *         schema:
     *           $ref: '#/components/rules/shortUrlParam'
     *     responses:
     *       200:
     *         description: Returns an array up to 5 analytics that are linked to a short link
     *       404:
     *         description: Link not found
     */
    namespace.get(
      '/list-by-link/:shortUrl',
      shortUrlParamRule,
      createRouteHandler(methods.listByLink),
    );

    root.use('/analytics', namespace);
  };
};

export const buildAnalyticsHandler = (params: Params): IHandler => {
  const listByLink = buildListByLink(params);

  return {
    registerRoutes: buildRegisterRoutes({ listByLink }),
  };
};
