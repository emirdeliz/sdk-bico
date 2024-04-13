import { checkIfIsEmptyUndefinedOrNull, isEqual, keysToCamel, keysToSnake } from './ObjectHelper';

const camelObject = {
  colorsCar: ['yellow', 'white', 'green'],
  name: 'Gol',
  attributes: {
    fastSpeed: true,
    economic: false,
  },
  values: [{ basicYellow: 30000 }, { advancedYellow: 35000 }, { basicWhite: 29000 }],
  validityOffer: new Date(),
  isZeroKm: true,
};

const snackObject = {
  colors_car: ['yellow', 'white', 'green'],
  name: 'Gol',
  attributes: {
    fast_speed: true,
    economic: false,
  },
  values: [{ basic_yellow: 30000 }, { advanced_yellow: 35000 }, { basic_white: 29000 }],
  validity_offer: new Date(),
  is_zero_km: true,
};

describe('helpers/object', () => {
  test('Should will have return true for checkIfIsEmptyUndefinedOrNull with parameter undefined', () => {
    const resultEmpty = checkIfIsEmptyUndefinedOrNull();
    const resultUndefined = checkIfIsEmptyUndefinedOrNull(undefined);
    expect(resultEmpty).toBeTruthy();
    expect(resultUndefined).toBeTruthy();
  });

  test('Should will have return true for checkIfIsEmptyUndefinedOrNull with parameter null', () => {
    const result = checkIfIsEmptyUndefinedOrNull(null);
    expect(result).toBeTruthy();
  });

  test('Should will have return true for checkIfIsEmptyUndefinedOrNull with parameter ""', () => {
    const result = checkIfIsEmptyUndefinedOrNull('');
    expect(result).toBeTruthy();
  });

  test('Should will have return true for checkIfIsEmptyUndefinedOrNull with parameter "  "', () => {
    const result = checkIfIsEmptyUndefinedOrNull('  ');
    expect(result).toBeTruthy();
  });

  test('Should will have return false for checkIfIsEmptyUndefinedOrNull with parameter 1', () => {
    const result = checkIfIsEmptyUndefinedOrNull(1);
    expect(result).toBeFalsy();
  });

  test('Should will have return false for checkIfIsEmptyUndefinedOrNull with parameter -1', () => {
    const result = checkIfIsEmptyUndefinedOrNull(-1);
    expect(result).toBeFalsy();
  });

  test('Should will have return false for checkIfIsEmptyUndefinedOrNull with parameter "abc"', () => {
    const result = checkIfIsEmptyUndefinedOrNull('abc');
    expect(result).toBeFalsy();
  });

  test('Should will have return false for checkIfIsEmptyUndefinedOrNull with parameter new Date()', () => {
    const result = checkIfIsEmptyUndefinedOrNull(new Date());
    expect(result).toBeFalsy();
  });

  test('Should will have return false for checkIfIsEmptyUndefinedOrNull with parameter false', () => {
    const result = checkIfIsEmptyUndefinedOrNull(false);
    expect(result).toBeFalsy();
  });

  test('Should will have return false for checkIfIsEmptyUndefinedOrNull with parameter true', () => {
    const result = checkIfIsEmptyUndefinedOrNull(true);
    expect(result).toBeFalsy();
  });

  test('Should will to convert to snake null object', () => {
    const result = keysToSnake<keyof typeof snackObject>(undefined);
    expect(isEqual(result, undefined)).toBe(true);
  });

  test('Should will to convert to snake number object', () => {
    const result = keysToSnake(10);
    expect(isEqual(result, 10)).toBe(true);
  });

  test('Should will to convert to snake string object', () => {
    const result = keysToSnake('test');
    expect(isEqual(result, 'test')).toBe(true);
  });

  test('Should will to convert to snake boolean object', () => {
    const result = keysToSnake(true as unknown);
    expect(isEqual(result, true)).toBe(true);
  });

  test('Should will to convert to snake object', () => {
    const result = keysToSnake(camelObject) as keyof typeof snackObject;
    expect(isEqual(result, snackObject)).toBe(true);
  });

  test('Should will to convert to camel null object', () => {
    const result = keysToCamel(null);
    expect(isEqual(result, null)).toBe(true);
  });

  test('Should will to convert to camel number object', () => {
    const result = keysToCamel(10);
    expect(isEqual(result, 10)).toBe(true);
  });

  test('Should will to convert to camel string object', () => {
    const result = keysToCamel('test');
    expect(isEqual(result, 'test')).toBe(true);
  });

  test('Should will to convert to camel boolean object', () => {
    const result = keysToCamel(true);
    expect(isEqual(result, true)).toBe(true);
  });

  test('Should will to convert to camel object', () => {
    const result = keysToCamel<keyof typeof snackObject>(snackObject);
    expect(isEqual(result, camelObject)).toBe(true);
  });
});
