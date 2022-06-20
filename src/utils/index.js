export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  let result = { ...obj };
  for (let key in result) {
    if (isFalsy(result[key])) {
      delete result[key];
    }
  }
  return result;
};
