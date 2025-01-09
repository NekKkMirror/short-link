import request, { Response } from 'supertest';

import { entry } from '@/app/entry';
import {
  endpoints,
  errorMessages,
  EXISTING_ROW,
  FAKE_ALIAS,
  TO_CREATE,
} from '@/__tests__/integration/shortened-link/constants';

let node: any;

beforeAll(async (): Promise<void> => {
  node = await entry();
});
afterAll((): void => {
  node.stop();
});

describe('GET /shortened-link/:shortUrl', (): void => {
  it('should redirect to the original URL', async (): Promise<void> => {
    const response: Response = await request(node.server).get(
      endpoints.redirect(EXISTING_ROW.alias),
    );

    expect(response.status).toBe(302);
    expect(response.header['location']).toBe(EXISTING_ROW.originalUrl);
  });

  it('should return 404 if shortUrl not found', async (): Promise<void> => {
    const response: Response = await request(node.server).get(endpoints.redirect(FAKE_ALIAS));

    expect(response.body.error.message).toBe(errorMessages.notFound(FAKE_ALIAS));
  });

  it('should return 410 if the short URL has expired', async (): Promise<void> => {
    await request(node.server)
      .post(endpoints.create)
      .send({
        ...TO_CREATE,
        expiresAt: new Date(Date.now() - 1000).toISOString(),
      });

    const response: Response = await request(node.server).get(endpoints.redirect(TO_CREATE.alias));

    expect(response.body.error.message).toBe(errorMessages.gone(TO_CREATE.alias));
  });
});
