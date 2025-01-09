import { Adapter } from '@/domain/types';

import { buildCreate, Create } from './create';
import { buildCheck, Check } from './check';
import { buildAddClick, AddClick } from './add-click';

export type ShortenedLinkService = {
  create: Create;
  check: Check;
  addClick: AddClick;
};

export const buildShortenedLinkService = (params: Adapter): ShortenedLinkService => {
  const create = buildCreate(params);
  const check = buildCheck(params);
  const addClick = buildAddClick(params);

  return {
    create,
    check,
    addClick,
  };
};
