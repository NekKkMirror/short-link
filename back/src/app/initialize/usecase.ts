import * as usecase from '@/domain/usecase';

import { buildServices } from './services';
import { buildAdapter } from './adapter';

export const buildUseCase = () => {
  const service = buildServices();
  const adapter = buildAdapter();

  return usecase.buildUseCase({
    service,
    adapter,
  });
};
