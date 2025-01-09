import { Adapter } from '@/domain/types';
import { buildExampleService, ExampleService } from '@/domain/service/example';
import { buildShortenedLinkService, ShortenedLinkService } from '@/domain/service/shortened-link';

export type Service = {
  shortenedLink: ShortenedLinkService;
  example: ExampleService;
};

export const buildService = (params: Adapter): Service => {
  const shortenedLink = buildShortenedLinkService(params);
  const example = buildExampleService(params);

  return {
    shortenedLink,
    example,
  };
};
