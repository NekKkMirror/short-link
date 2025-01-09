import { API_URL } from '@/__tests__/integration/common/constants';

const SHORTENED_LINK_URL = `${API_URL}/shortened-link`;

const getNavigateByShortUrl = (prefix?: string) => (shortUrl: string) =>
  `${SHORTENED_LINK_URL}${prefix ? prefix : ''}/${shortUrl}`;

export const endpoints = Object.freeze({
  create: SHORTENED_LINK_URL,
  redirect: getNavigateByShortUrl(),
  info: getNavigateByShortUrl('/info'),
  delete: getNavigateByShortUrl(),
});

export const errorMessages = {
  invalidData: (shortUrl: string) => `Short URL with alias "${shortUrl}" already exists.`,
  notFound: (shortUrl: string) => `Short URL "${shortUrl}" not found.`,
  gone: (shortUrl: string) => `Short URL ${shortUrl} has expired create new one.`,
};

export const FAKE_ALIAS = 'null';

export const EXISTING_ROW = {
  id: 'beadc700-6342-401b-ba1e-4d15b3bb35ac',
  shortUrl: 'ges3y2',
  originalUrl: 'https://www.uuidgenerator.net',
  alias: 'ges3y2',
  createdAt: '2025-01-10T17:52:13.000Z',
  expiresAt: null,
};

export const TO_CREATE = {
  originalUrl: 'http://example.com',
  alias: 'my_alias',
};
