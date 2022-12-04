const parseArgs = () => {
  const resArr = process.argv.slice(2).reduce((resArr, currStr, index, argv) => {
    if (currStr.indexOf('--') !== -1) {
      const arrItem = `${currStr.slice(2)} is ${argv[index + 1]}`;
      resArr.push(arrItem);
    }
    return resArr;
  }, []);

  console.log(resArr.join(', '));
};

parseArgs();
