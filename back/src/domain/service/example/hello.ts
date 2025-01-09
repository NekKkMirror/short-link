import { Adapter } from '@/adapter';

export type Hello = (data: { example: { hello: string } }) => Promise<string>;
export const buildHello =
  ({ exampleGateway }: Adapter): Hello =>
  async ({ example: { hello } }) => {
    await exampleGateway.example();

    return hello;
  };
