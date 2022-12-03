import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const errorMessage = 'FS operation failed';

const rename = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'wrongFilename.txt';
  const folderName = 'files';
  const fileNameNew = 'properFilename.md';
  const fullName = getFullName(metaUrl, folderName, fileName);
  const fullNameNew = getFullName(metaUrl, folderName, fileNameNew);

  try {
    await fsPromises.writeFile(fullNameNew, '', { flag: 'wx' });
    await fsPromises.rename(fullName, fullNameNew);
    console.log(`"${fileName}" renamed to "${fileNameNew}"`);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

await rename();
