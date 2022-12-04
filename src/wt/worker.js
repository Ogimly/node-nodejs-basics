import { workerData, parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
  const { counter, isLog } = workerData;

  if (isLog) console.log(`worker ${counter} -> start`);
  const result = nthFibonacci(counter);
  parentPort.postMessage(result);
  if (isLog) console.log(`worker ${counter} -> ${result}`);
};

sendResult();
