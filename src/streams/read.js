import { createReadStream } from 'fs';
import { stdout } from 'process';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const read = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fileToRead.txt';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);

  try {
    const streamRead = createReadStream(fullName, 'utf-8');
    streamRead.pipe(stdout);
  } catch (error) {
    console.log(error);
  }
};

await read();
