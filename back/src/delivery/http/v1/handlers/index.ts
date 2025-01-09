import Express from 'express';

import { DeliveryParams } from '@/delivery/types';
import { IHandler } from '@/delivery/http/v1/handlers/types';
import { buildExampleHandler } from '@/delivery/http/v1/handlers/example';
import { buildShortenedLinkHandler } from '@/delivery/http/v1/handlers/shortened-link';
import { buildAnalyticsHandler } from '@/delivery/http/v1/handlers/analytics';

export const buildHandler = (params: DeliveryParams): Express.Router => {
  const router = Express.Router();

  const handlers: Array<IHandler> = [
    buildShortenedLinkHandler(params),
    buildAnalyticsHandler(params),
    buildExampleHandler(params),
  ];

  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];

    handler.registerRoutes(router);
  }

  return router;
};
