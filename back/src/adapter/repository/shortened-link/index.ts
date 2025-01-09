import { AdapterParams } from '@/adapter/types';

import { buildDelete, Delete } from './delete';
import { buildUpdate, Update } from './update';
import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';

type Params = Pick<AdapterParams, 'db'>;

export type ShortenedLinkRepository = {
  create: Create;
  update: Update;
  get: Get;
  delete: Delete;
};
export const buildShortenedLinkRepository = (params: Params): ShortenedLinkRepository => {
  const create = buildCreate(params);
  const update = buildUpdate(params);
  const get = buildGet(params);
  const deleteUser = buildDelete(params);

  return {
    create,
    update,
    get,
    delete: deleteUser,
  };
};
