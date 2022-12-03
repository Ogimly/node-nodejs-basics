const parseEnv = () => {
  Object.entries(process.env).forEach(([key, value]) => {
    if (key.indexOf('RSS_') !== -1) {
      console.log(`${key} = ${value}`);
    }
  });
};

parseEnv();
