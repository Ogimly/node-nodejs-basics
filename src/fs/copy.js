import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { getFullName, logStatus } from '../utils/utils.js';

const errorMessage = 'FS operation failed';

const makeDir = async (folder, isLog = true) => {
  try {
    await fsPromises.mkdir(folder);
    if (isLog) console.log(`${folder} created`);
  } catch {
    throw new Error(errorMessage);
  }
};

const copyDir = async (folderSrc, folderDest, isLog = true) => {
  try {
    const files = await fsPromises.readdir(folderSrc, { withFileTypes: true });

    await Promise.all(
      files.map((file) => {
        let prevFileName = path.join(folderSrc, file.name);
        let newFileName = path.join(folderDest, file.name);

        if (file.isFile()) {
          if (isLog) console.log(`copy ${prevFileName} -> ${newFileName}`);
          fsPromises.copyFile(prevFileName, newFileName);
        } else {
          if (isLog) console.log(`copy dir ${prevFileName} -> ${newFileName}`);
          makeDir(newFileName, isLog);
          copyDir(prevFileName, newFileName, isLog);
        }
      })
    );
  } catch {
    throw new Error(errorMessage);
  }
};

const copy = async () => {
  const metaUrl = fileURLToPath(import.meta.url);
  const folderSrc = 'files';
  const folderDest = 'files_copy';
  const fullNameSrc = getFullName(metaUrl, folderSrc);
  const fullNameDest = getFullName(metaUrl, folderDest);

  const isLog = logStatus();

  try {
    await makeDir(fullNameDest, isLog);
    await copyDir(fullNameSrc, fullNameDest, isLog);
    console.log(`Done. New directory is "${folderDest}"`);
  } catch (error) {
    console.log(`Failed. Error has been thrown: "${error.message}"`);
  }
};

copy();
