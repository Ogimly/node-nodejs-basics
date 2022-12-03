import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const errorMessage = 'FS operation failed';

const list = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName);

  try {
    const files = await fsPromises.readdir(fullName, { withFileTypes: true });
    files.forEach((file) =>
      file.isFile()
        ? console.log(`file: ${file.name}`)
        : console.log(`folder: ${file.name}`)
    );

    console.log(`Done`);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

await list();
