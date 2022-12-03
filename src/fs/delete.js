import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const errorMessage = 'FS operation failed';

const remove = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fileToRemove.txt';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);

  try {
    await fsPromises.rm(fullName);
    console.log(`"${fileName}" deleted`);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

await remove();
