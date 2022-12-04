import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const errorMessage = 'FS operation failed';

const list = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName);

  try {
    try {
      const files = await fsPromises.readdir(fullName, { withFileTypes: true });
      console.log(`List of "${folderName}":`);
      files.forEach((file) =>
        file.isFile()
          ? console.log(`file: ${file.name}`)
          : console.log(`folder: ${file.name}`)
      );

      console.log(`Done`);
    } catch (error) {
      console.log(error.message);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(`Failed. Error has been thrown: "${error.message}"`);
  }
};

await list();
