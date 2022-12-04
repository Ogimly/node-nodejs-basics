import fsPromises from 'fs/promises';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const calculateHash = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fileToCalculateHashFor.txt';
  const folderName = 'files';
  const fullName = getFullName(metaUrl, folderName, fileName);
  console.log(fullName);

  try {
    const content = await fsPromises.readFile(fullName);
    const hash = createHash('sha256').update(content).digest('hex');
    console.log('Hash: ' + hash);
  } catch (error) {
    console.log(error);
  }
};

await calculateHash();
