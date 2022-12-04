import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { getFullName, logStatus } from '../utils/utils.js';

const performCalculations = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'worker.js';
  const fullName = getFullName(metaUrl, fileName);

  const isLog = logStatus();

  const CPUs = cpus();
  let counter = 10;

  const resultsOfWorkers = await Promise.allSettled(
    CPUs.map(() => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(fullName, {
          workerData: { counter, isLog },
        });
        counter += 1;

        worker.on('message', (res) => resolve(res));
        worker.on('error', (res) => reject(res));
      });
    })
  );

  const results = resultsOfWorkers.map((res) =>
    res.status === 'fulfilled'
      ? { status: 'resolved', data: res.value }
      : { status: 'error', data: null }
  );

  console.log(results);
};

await performCalculations();
