import path, { dirname } from 'path';

export const getFullName = (fileName, ...paths) => {
  const __dirname = dirname(fileName);
  const fullName = path.join(__dirname, ...paths);
  return fullName;
};

// node src/fs/copy.js -с off||on
// default value 'off' -> false
export const logStatus = () => {
  const index = process.argv.indexOf('-c');
  return index === -1 ? false : process.argv[index + 1] === 'on';
};
