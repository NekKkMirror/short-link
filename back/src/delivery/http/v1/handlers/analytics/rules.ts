import { query } from 'express-validator';

import { validateSchema } from '@/delivery/http/v1/middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *     analyticsQuery:
 *       properties:
 *         limit:
 *           type: number
 */
export const analyticsQueryRules = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be a number between 1 and 50'),

  validateSchema,
];
