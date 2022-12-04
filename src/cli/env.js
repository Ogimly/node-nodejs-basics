const parseEnv = () => {
  const resArr = Object.entries(process.env).reduce((resArr, [key, value]) => {
    if (key.indexOf('RSS_') !== -1) {
      const arrItem = `${key} = ${value}`;
      resArr.push(arrItem);
    }
    return resArr;
  }, []);

  console.log(resArr.join('; '));
};

parseEnv();
