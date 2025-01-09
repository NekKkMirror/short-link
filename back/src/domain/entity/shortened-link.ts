import { ShortenedLink } from '@prisma/client';

export interface IShortenedLink extends ShortenedLink {}

export interface IShortenedLinkResponse {
  id: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: Date;
  expiresAt: Date | null;
  clickCount: number;
}

export interface IShortenedLinkCreate {
  originalUrl: string;
  alias?: string;
  expiresAt?: Date;
}

export interface IShortenedLinkPrepareRedirect extends IShortenedLinkShortUrl {
  ipAddress: string;
}

export interface IShortenedLinkShortUrl {
  shortUrl: string;
}

/**
 * @openapi
 * components:
 *   entities:
 *     ShortenedLink:
 *       required:
 *         - id
 *         - shortUrl
 *         - originalUrl
 *         - createdAt
 *         - clickCount
 *       properties:
 *         id:
 *           type: string
 *         shortUrl:
 *           type: string
 *         originalUrl:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         expiresAt:
 *           type: string
 *           format: date-time
 *         clickCount:
 *           type: number
 */
