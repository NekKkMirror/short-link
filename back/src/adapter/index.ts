import { AdapterParams } from '@/adapter/types';
import { buildExampleGateway, ExampleGateway } from '@/adapter/gateway/example';
import {
  AnalyticsRepository,
  buildAnalyticsRepository,
  buildShortenedLinkRepository,
  ShortenedLinkRepository,
} from '@/adapter/repository';

export type Adapter = {
  shortenedLinkRepository: ShortenedLinkRepository;
  analyticsRepository: AnalyticsRepository;

  exampleGateway: ExampleGateway;
};

export const buildAdapter = (params: AdapterParams): Adapter => {
  const shortenedLinkRepository = buildShortenedLinkRepository(params);
  const analyticsRepository = buildAnalyticsRepository(params);

  const exampleGateway = buildExampleGateway(params);

  return {
    shortenedLinkRepository,
    analyticsRepository,

    exampleGateway,
  };
};
