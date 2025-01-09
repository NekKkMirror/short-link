import request, { Response } from 'supertest';

import { entry } from '@/app/entry';
import { endpoints, EXISTING_SHORT_URL } from '@/__tests__/integration/analytics/constants';
import { FAKE_ALIAS } from '@/__tests__/integration/shortened-link/constants';

let node: any;

beforeAll(async (): Promise<void> => {
  node = await entry();
});
afterAll((): void => {
  node.stop();
});

describe('GET /analytics/list-by-link/:shortUrl', (): void => {
  it('should return list of analytics by short url', async (): Promise<void> => {
    const response: Response = await request(node.server).get(
      endpoints.listByLink(EXISTING_SHORT_URL),
    );

    expect(response.status).toBe(200);
    expect(response.body.recentClicks.length).toBeGreaterThan(0);
  });

  it('should return empty list of analytics by fake short url alias', async (): Promise<void> => {
    const response: Response = await request(node.server).get(endpoints.listByLink(FAKE_ALIAS));

    expect(response.status).toBe(200);
    expect(response.body.recentClicks).toEqual([]);
    expect(response.body.totalClicks).toBe(0);
  });
});
