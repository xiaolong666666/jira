export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (obj: object) => {
  let result = { ...obj };
  for (let key in result) {
    //  @ts-ignore
    if (isFalsy(result[key])) {
      //  @ts-ignore
      delete result[key];
    }
  }
  return result;
};
