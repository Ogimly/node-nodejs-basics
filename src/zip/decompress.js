import { rm } from 'fs/promises';
import { createUnzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline, finished } from 'stream';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const decompress = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fileToCompress.txt';
  const folderName = 'files';
  const fileNameZip = 'archive.gz';
  const fullName = getFullName(metaUrl, folderName, fileName);
  const fullNameZip = getFullName(metaUrl, folderName, fileNameZip);

  try {
    const readStream = createReadStream(fullNameZip);
    const writeStream = createWriteStream(fullName);
    const Gzip = createUnzip();

    pipeline(readStream, Gzip, writeStream, (error) => {
      if (error) {
        console.log(`error on decompressing: ${error}`);
      }
    });

    finished(readStream, async (error) => {
      if (error) {
        await rm(fullName, { force: true });
      } else {
        console.log(`"${fileNameZip}" decompressed to "${fileName}"`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

await decompress();
