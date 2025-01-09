import request, { Response } from 'supertest';

import { entry } from '@/app/entry';
import {
  endpoints,
  errorMessages,
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

describe('DELETE /shortened-link/:shortUrl', (): void => {
  it('should delete a shortened link by generate short url', async (): Promise<void> => {
    const {
      body: { shortUrl },
    } = await request(node.server)
      .post(endpoints.create)
      .send({ originalUrl: TO_CREATE.originalUrl });
    const response: Response = await request(node.server).delete(endpoints.delete(shortUrl));

    expect(response.status).toBe(204);
  });

  it('should return 404 if link does not exist', async (): Promise<void> => {
    const response: Response = await request(node.server).delete(endpoints.delete(FAKE_ALIAS));

    expect(response.body.error.message).toBe(errorMessages.notFound(FAKE_ALIAS));
  });
});
