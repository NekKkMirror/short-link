import request, { Response } from 'supertest';

import { entry } from '@/app/entry';
import {
  endpoints,
  errorMessages,
  EXISTING_ROW,
  FAKE_ALIAS,
} from '@/__tests__/integration/shortened-link/constants';

let node: any;

beforeAll(async (): Promise<void> => {
  node = await entry();
});
afterAll((): void => {
  node.stop();
});

describe('GET /shortened-link/info/:shortUrl', (): void => {
  it('should return shortened link info', async (): Promise<void> => {
    const response: Response = await request(node.server).get(endpoints.info(EXISTING_ROW.alias));

    expect(response.status).toBe(200);

    const { originalUrl, createdAt } = EXISTING_ROW;
    expect(response.body).toMatchObject({
      originalUrl,
      createdAt,
    });
  });

  it('should return 404 for non-existent link', async (): Promise<void> => {
    const response: Response = await request(node.server).get(endpoints.info(FAKE_ALIAS));

    expect(response.body.error.message).toBe(errorMessages.notFound(FAKE_ALIAS));
  });
});
