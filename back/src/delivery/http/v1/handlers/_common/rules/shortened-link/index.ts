import { param } from 'express-validator';

import { validateSchema } from '@/delivery/http/v1/middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *     shortUrlParam:
 *       required:
 *         - shortUrl
 *       properties:
 *         shortUrl:
 *           type: string
 */
export const shortUrlParamRule = [
  param('shortUrl')
    .exists()
    .withMessage('Short URL parameter is required')
    .bail()
    .isString()
    .withMessage('Short URL must be a string'),

  validateSchema,
];
