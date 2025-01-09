import request, { Response } from 'supertest';

import { entry } from '@/app/entry';
import {
  endpoints,
  errorMessages,
  EXISTING_ROW,
  TO_CREATE,
} from '@/__tests__/integration/shortened-link/constants';

let node: any;

beforeAll(async (): Promise<void> => {
  node = await entry();
});
afterAll((): void => {
  node.stop();
});

describe('POST /shortened-link', (): void => {
  it('should create a shortened link', async (): Promise<void> => {
    const response = await request(node.server).post(endpoints.create).send(TO_CREATE);

    expect(response.status).toBe(201);

    await request(node.server).delete(endpoints.delete(TO_CREATE.alias));
  });

  it('should return 400 if link exists', async (): Promise<void> => {
    const response = await request(node.server)
      .post(endpoints.create)
      .send({ alias: EXISTING_ROW.alias, originalUrl: TO_CREATE.originalUrl });

    expect(response.body.error.message).toBe(errorMessages.invalidData(EXISTING_ROW.alias));
  });

  it('should validate request body', async (): Promise<void> => {
    const response: Response = await request(node.server).post(endpoints.create).send({});

    expect(response.status).toBe(400);
  });
});
