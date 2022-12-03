import path, { dirname } from 'path';

export const getFullName = (fileName, ...paths) => {
  const __dirname = dirname(fileName);
  const fullName = path.join(__dirname, ...paths);
  return fullName;
};
