export type JsonReviverFunction = (
  this: ThisType<unknown>,
  key: string,
  value: unknown
) => unknown;

export const elcReviver: JsonReviverFunction = function (this, _key, value) {
  if (value === "") {
    return null;
  }
  return value;
};
