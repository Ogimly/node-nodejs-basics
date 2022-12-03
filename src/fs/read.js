import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const errorMessage = 'FS operation failed';

const read = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fileToRead.txt';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);

  try {
    const content = (await fsPromises.readFile(fullName)).toString();
    console.log(`Content of "${fileName}":`);
    console.log(content);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

await read();
