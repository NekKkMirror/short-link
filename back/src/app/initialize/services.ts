import * as service from '@/domain/service';

import { buildAdapter } from './adapter';

export const buildServices = () => {
  const adapter = buildAdapter();

  return service.buildService(adapter);
};
