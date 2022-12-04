import { rm } from 'fs/promises';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const errorMessage = 'FS operation failed';

const remove = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fileToRemove.txt';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);

  try {
    try {
      await rm(fullName);
      console.log(`"${fileName}" deleted`);
    } catch (error) {
      console.log(error.message);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(`Failed. Error has been thrown: "${error.message}"`);
  }
};

await remove();
