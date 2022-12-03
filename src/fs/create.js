import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

export const create = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fresh.txt';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);

  const content = 'I am fresh and young';
  const errorMessage = 'FS operation failed';

  try {
    await writeFile(fullName, content, { flag: 'wx' });
    console.log(`"${fileName}" created`);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

create();
