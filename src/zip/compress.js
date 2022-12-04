import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { getFullName } from '../utils/utils.js';

const compress = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const fileName = 'fileToCompress.txt';
  const folderName = 'files';
  const fileNameZip = 'archive.gz';
  const fullName = getFullName(metaUrl, folderName, fileName);
  const fullNameZip = getFullName(metaUrl, folderName, fileNameZip);

  try {
    const readStream = createReadStream(fullName);
    const writeStream = createWriteStream(fullNameZip);
    const Gzip = createGzip();

    pipeline(readStream, Gzip, writeStream, (error) => {
      if (error) {
        stderr.write(`error on compressing: ${error}`);
      }
    });

    console.log(`"${fileName}" compressed to "${fileNameZip}"`);
  } catch (error) {
    console.log(error);
  }
};

await compress();
