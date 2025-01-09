import { check } from 'express-validator';

import { validateSchema } from '@/delivery/http/v1/middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *     createShortenLink:
 *       required:
 *         - originalUrl
 *       properties:
 *         originalUrl:
 *           type: string
 *         alias:
 *           type: string
 *         expiresAt:
 *           type: string
 *           format: date-time
 */
export const createShortenLinkRules = [
  check('originalUrl')
    .exists()
    .withMessage('Original URL is required')
    .bail()
    .isURL()
    .withMessage('Invalid URL format'),

  check('alias')
    .optional()
    .isString()
    .withMessage('Alias must be a string')
    .isLength({ max: 20 })
    .withMessage('Alias must not exceed 20 characters'),

  check('expiresAt').optional().isISO8601().withMessage('ExpiresAt must be a valid ISO date'),

  validateSchema,
];
