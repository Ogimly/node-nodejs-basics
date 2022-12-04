import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const spawnChildProcess = async (args) => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'script.js';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);

  const childProcess = fork(fullName, [...args], {
    stdio: [process.stdin, process.stdout, 'ipc'],
  });
};

spawnChildProcess(['1', '2', '3']);
