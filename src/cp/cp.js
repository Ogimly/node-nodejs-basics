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

  //   const childProcess = fork(fullName, [...args], { silent: true });

  //   process.stdin.pipe(childProcess.stdin);
  //   childProcess.stdout.pipe(process.stdout);

  // process.stdout.write('Enter text (press Ctrl+C to cancel):\n');
  setTimeout(() => process.stdout.write('Enter text (press Ctrl+C to cancel):\n'), 120);
};

spawnChildProcess(['1', '2', '3']);
