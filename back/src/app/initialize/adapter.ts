import * as client from '@/lib/clients';
import * as adapter from '@/adapter';
import { config } from '@/config';

export const buildAdapter = () => {
  const db = client.prismaClient.newClient();
  const example = client.example.newClient({
    message: config.example.message,
  });

  return adapter.buildAdapter({
    db,
    example,
  });
};
