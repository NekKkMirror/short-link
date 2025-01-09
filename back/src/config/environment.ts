import { z } from 'zod';

const portTransform = z.string().regex(/^\d+$/).transform(Number);

const environmentSchema = z.object({
  // Application
  APP_NODE_ENV: z.enum(['development', 'testing', 'production']).default('development'),
  APP_PORT: portTransform,
  APP_HOST: z.string(),

  // Other
  EXAMPLE_MESSAGE: z.string(),

  // Database
  DATABASE_URL: z.string(),
});

const parsed = environmentSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const environment = parsed.data;
