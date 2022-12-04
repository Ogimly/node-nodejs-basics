import fs from 'fs';
import { stdout } from 'process';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const write = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fileToWrite.txt';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);

  try {
    const streamWrite = fs.createWriteStream(fullName, 'utf-8');
    process.stdin.pipe(streamWrite);

    stdout.write('Enter text to write to file (press Ctrl+C to cancel):\n');
  } catch (error) {
    console.log(error);
  }
};

await write();
