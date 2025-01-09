import { logger } from '@/lib';

export const setupErrorHandlers = () => {
  process.on('uncaughtException', (err) => {
    logger.log({
      level: 'error',
      message: err.message,
      stack: err.stack,
    });
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection:', reason);
    console.error('Promise:', promise);
  });
};
