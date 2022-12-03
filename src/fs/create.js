import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

export const create = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fileName = 'fresh.txt';
  const folderName = 'files';
  const fullName = path.join(__dirname, folderName, fileName);

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
