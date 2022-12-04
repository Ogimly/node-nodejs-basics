import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const errorMessage = 'FS operation failed';

export const create = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fresh.txt';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);

  const content = 'I am fresh and young';

  try {
    try {
      await writeFile(fullName, content, { flag: 'wx' });
      console.log(`"${fileName}" created`);
    } catch (error) {
      console.log(error.message);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(`Failed. Error has been thrown: "${error.message}"`);
  }
};

create();
