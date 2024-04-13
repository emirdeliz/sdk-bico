import { GenericObject } from '@types';

export const checkIfIsEmptyUndefinedOrNull = (value?: number | string | Date | boolean | null) =>
  typeof value === 'undefined' || value === null || String(value).trim() === '';

export const checkListHasValueEmptyUndefinedOrNull = (
  list: Array<string | Date | number | boolean | undefined | null>
) => list.some((value) => checkIfIsEmptyUndefinedOrNull(value));

export const isObject = (value: GenericObject) =>
  value === Object(value) &&
  !Array.isArray(value) &&
  !(value instanceof Function) &&
  !(value instanceof Date);

export const listKeysToCamel = <T>(list?: GenericObject[]) =>
  Array.isArray(list) ? list?.map((obj) => keysTo(IKeysTo.Camel, obj) as T) : [] || [];

export const toCamel = (s: string) =>
  s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));

export const toSnake = (s: string) => s.replace(/([A-Z])/g, '_$1').toLowerCase();

enum IKeysTo {
  Snake = 'snake',
  Camel = 'camel',
}

export const keysTo = (format: IKeysTo, obj?: GenericObject): GenericObject => {
  const isSnack = format === IKeysTo.Snake;
  if (isObject(obj)) {
    const value = obj as { [key: string]: GenericObject };
    const result = {} as { [key: string]: GenericObject };
    Object.keys(value || {}).forEach((key: string) => {
      const keyTo = isSnack ? toSnake(key) : toCamel(key);
      const nextValue = value ? (value[key] as keyof typeof value) : null;
      result[keyTo] = keysTo(format, nextValue) as keyof typeof value;
    });
    return result;
  }
  if (Array.isArray(obj)) {
    return obj ? (obj as Array<GenericObject>).map((i: GenericObject) => keysTo(format, i)) : null;
  }
  return obj as GenericObject;
};

export const keysToCamel = <T>(obj?: GenericObject) => keysTo(IKeysTo.Camel, obj) as T;

export const keysToSnake = <T>(obj?: T) => keysTo(IKeysTo.Snake, obj) as unknown;

export const deepCompare = (obj1: GenericObject, obj2: GenericObject) => {
  if (!obj2 || !obj1) {
    return obj1 || obj2;
  }
  const diffObj = Array.isArray(obj2) ? [] : ({} as GenericObject);
  Object.getOwnPropertyNames(obj2).forEach((prop: string) => {
    const prop2 = prop as keyof typeof obj2;
    if (obj2[prop2] instanceof Object) {
      diffObj[prop] = deepCompare(obj1[prop], obj2[prop2]) as keyof typeof diffObj;
      // if it's an array with only length property => empty array => delete
      // or if it's an object with no own properties => delete
      if (
        (Array.isArray(diffObj[prop]) && Object.getOwnPropertyNames(diffObj[prop]).length === 1) ||
        Object.getOwnPropertyNames(diffObj[prop]).length === 0
      ) {
        delete diffObj[prop];
      }
    } else if (obj1[prop] !== obj2[prop2]) {
      diffObj[prop] = obj2[prop2] as keyof typeof diffObj;
    }
  });
  return diffObj;
};

export const isEqual = (obj1: GenericObject, obj2: GenericObject) => {
  const hasDiffType = typeof obj1 !== typeof obj2;
  if (hasDiffType) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const diff = deepCompare(obj1, obj2);
  const hasDiff = Object.keys(diff || {}).length;
  return !hasDiff;
};
