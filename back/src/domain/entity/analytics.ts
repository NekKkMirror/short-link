import { Analytics } from '@prisma/client';

export interface IAnalytics extends Analytics {}

export interface IAnalyticsList {
  totalClicks: number;
  recentClicks: Array<{
    ipAddress: string;
    clickedAt: Date;
  }>;
}

/**
 * @openapi
 * components:
 *   entities:
 *     Analytics:
 *       required:
 *         - id
 *         - linkId
 *         - ipAddress
 *         - clickedAt
 *       properties:
 *         id:
 *           type: string
 *         linkId:
 *           type: string
 *         ipAddress:
 *           type: string
 *         clickedAt:
 *           type: string
 *           format: date-time
 */
