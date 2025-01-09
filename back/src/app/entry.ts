import cluster from 'node:cluster';

import chalk from 'chalk';

import { config, devMode, prodMode, testMode } from '@/config';
import { log } from '@/lib';

import { setupErrorHandlers } from './initialize/error-handlers';
import { initializeWorkers } from './initialize/workers';
import { setupServer } from './initialize/server-setup';

export const entry = async () => {
  setupErrorHandlers();

  if (cluster.isPrimary) {
    log('Server starting...');
    initializeWorkers();

    if (prodMode) {
      return;
    }
  }

  const { server, stop } = setupServer();

  if (cluster.isPrimary) {
    const serverPort = config.http.port;
    const serverHost = config.http.host;

    log(
      `Server started ${chalk.blue(`[Port: ${serverPort}]`)} ${
        devMode || testMode ? chalk.red('[Dev Mode]') : chalk.green('[Prod Mode]')
      }
      \n\tAPI URL: ${chalk.gray.underline(`http://${serverHost}:${serverPort}/api/v1`)}
      \n\tSwagger URL: ${chalk.gray.underline(`http://${serverHost}:${serverPort}/api/v1/swagger`)}`,
    );
  }

  const sigListener = () => process.exit(0);
  const stopListener = () => {
    if (cluster.isPrimary) {
      log('Server stopped.');
    }

    stop();
    process.exit(0);
  };

  process.on('SIGINT', sigListener);
  process.on('SIGQUIT', sigListener);
  process.on('SIGTERM', sigListener);
  process.on('exit', stopListener);

  return { server, stop };
};
