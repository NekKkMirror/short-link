import * as server from '@/delivery/http/server';
import * as httpHandler from '@/delivery/http/v1/handlers';
import { buildRouter } from '@/delivery/http/v1/router';

import { buildUseCase } from './usecase';
import { buildAdapter } from './adapter';

export const setupServer = () => {
  const useCase = buildUseCase();
  const adapter = buildAdapter();

  const routerHandler = httpHandler.buildHandler({ ...useCase, ...adapter });
  const router = buildRouter(routerHandler);

  return server.buildServer().start(router);
};
