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

  try {
    pipeline(process.stdin, revert, process.stdout, (error) => {
      if (error) {
        stderr.write(`error on transform: ${error}`);
      }
    });

    console.log(`Type anything to console (press Ctrl+C to cancel):${EOL}`);
  } catch (error) {
    console.log(error);
  }
};

await transform();
