import { API_URL } from '@/__tests__/integration/common/constants';

const ANALYTICS_URL = `${API_URL}/analytics`;

export const endpoints = Object.freeze({
  listByLink: (shortUrl: string) => `${ANALYTICS_URL}/list-by-link/${shortUrl}`,
});

export const EXISTING_SHORT_URL = 'ges3y2';
