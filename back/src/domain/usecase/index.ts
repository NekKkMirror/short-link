import { UseCaseParams } from '@/domain/usecase/types';
import { buildExampleUseCase, ExampleUseCase } from '@/domain/usecase/example';
import { buildShortenedLinkUseCase, ShortenedLinkUseCase } from '@/domain/usecase/shortened-link';
import { AnalyticsUseCase, buildAnalyticsUseCase } from '@/domain/usecase/analytics';

export type UseCase = {
  shortenedLink: ShortenedLinkUseCase;
  analytics: AnalyticsUseCase;
  example: ExampleUseCase;
};

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const shortenedLink = buildShortenedLinkUseCase(params);
  const analytics = buildAnalyticsUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    shortenedLink,
    analytics,
    example,
  };
};
