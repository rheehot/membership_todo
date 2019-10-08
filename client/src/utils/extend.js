const extend = (...args) => {
  let obj;
  let name;
  let copy;
  const target = args[0] || {};
  const { length } = args;

  for (let i = 1; i < length; i += 1) {
    obj = args[i];
    if (obj !== null) {
      for (name in obj) {
        copy = obj[name];
        if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};

export default extend;
