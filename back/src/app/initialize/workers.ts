import cluster from 'node:cluster';
import os from 'node:os';

import { prodMode } from '@/config';
import { log } from '@/lib';

export const initializeWorkers = () => {
  if (cluster.isPrimary) {
    if (prodMode) {
      const workerCount = process.env.WORKER_COUNT
        ? parseInt(process.env.WORKER_COUNT)
        : os.cpus().length - 1;

      for (let i = 0; i < workerCount; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker) => {
        log(`Worker ${worker.process.pid} died.`);
      });
    }
  }

  if (cluster.isWorker) {
    log(`Worker ${process.pid} started.`);
  }
};
