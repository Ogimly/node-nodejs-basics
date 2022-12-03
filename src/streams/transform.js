import { Transform, pipeline } from 'stream';
import { EOL } from 'os';

const transform = async () => {
  const revert = new Transform({
    transform(chunk, encoding, callback) {
      callback(
        null,
        chunk.toString().replace(EOL, '').split('').reverse().join('') + EOL
      );
    },
  });

  pipeline(process.stdin, revert, process.stdout, (error) => {
    if (error) {
      stderr.write(`error on transform: ${error}`);
    }
  });

  console.log('Type anything to console:\n');
};

await transform();
