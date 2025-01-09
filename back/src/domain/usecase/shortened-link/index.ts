import { UseCaseParams } from '@/domain/usecase/types';

import { buildCreate, Create } from './create';
import { buildInfo, Info } from './info';
import { buildPrepareRedirect, PrepareRedirect } from './prepare-redirect';
import { buildDelete, Delete } from './delete';

export type ShortenedLinkUseCase = {
  create: Create;
  info: Info;
  prepareRedirect: PrepareRedirect;
  delete: Delete;
};

export const buildShortenedLinkUseCase = (params: UseCaseParams): ShortenedLinkUseCase => {
  const create = buildCreate(params);
  const info = buildInfo(params);
  const prepareRedirect = buildPrepareRedirect(params);
  const deleteAnalytics = buildDelete(params);

  return {
    create,
    info,
    prepareRedirect,
    delete: deleteAnalytics,
  };
};
