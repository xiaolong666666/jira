export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  let result = { ...obj };
  for (let key in result) {
    if (isVoid(result[key])) {
      delete result[key];
    }
  }
  return result;
};

export const resetRoute = () => (window.location.href = window.location.origin);
