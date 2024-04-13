import { getMonthByIndex } from '..';
import {
  checkingIfDateIsGreaterThanAnotherIgnoringTime,
  resetTimeFromDate,
  isCurrentMonthAndYear,
  getMonthDifference,
} from './DateHelper';

describe('helpers/date/getMonthDifference', () => {
  test('Should have positive 60 months', () => {
    const firstDate = new Date(2022, 3, 1);
    const secondDate = new Date(2017, 3, 1);
    const result = getMonthDifference(firstDate, secondDate);
    expect(result).toBe(60);
  });

  test('Should have 1 month', () => {
    const firstDate = new Date(2022, 3, 1);
    const secondDate = new Date(2022, 4, 1);
    const result = getMonthDifference(firstDate, secondDate);
    expect(result).toBe(1);
  });
  test('Should have 0 month', () => {
    const firstDate = new Date(2022, 3, 1);
    const secondDate = new Date(2022, 3, 1);
    const result = getMonthDifference(firstDate, secondDate);
    expect(result).toBe(0);
  });
});

describe('helpers/date/checkingIfDateIsGreaterThanAnotherIgnoringTime', () => {
  beforeEach(() => {
    const param = new Date(2021, 10, 21);
    jest.spyOn(global.Date.prototype, 'getMonth').mockReturnValue(param.getMonth());
    jest.spyOn(global.Date.prototype, 'getFullYear').mockReturnValue(param.getFullYear());
  });
  test('Should have false with undefined, undefined', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime();
    expect(result).toBeFalsy();
  });
  test('Should have false with undefined, ""', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime(undefined, '');
    expect(result).toBeFalsy();
  });
  test('Should have false with "", undefined', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime('');
    expect(result).toBeFalsy();
  });
  test('Should have false with 01-01-2030, undefined', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime('01-01-2030');
    expect(result).toBeFalsy();
  });
  test('Should have false with 01-01-2030, v4.0.0-rc.4', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime('01-01-2030', 'v4.0.0-rc.4');
    expect(result).toBeFalsy();
  });
  test('Should have false with "", ""', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime('', '');
    expect(result).toBeFalsy();
  });
  test('Should have false with 10-12-2021 15:30:58 GMT-0300, 10-12-2021 12:30:58 GMT-0300', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime(
      '10-12-2021 15:30:58 GMT-0300',
      '10-12-2021 12:30:58 GMT-0300'
    );
    expect(result).toBeFalsy();
  });
  test('Should have true with 02-01-2030, 01-01-2030', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime('02-01-2030', '01-01-2030');
    expect(result).toBeTruthy();
  });
  test('Should have true with 10-12-2021 15:30:58 GMT-0300, 09-12-2021 15:30:58 GMT-0300', () => {
    const result = checkingIfDateIsGreaterThanAnotherIgnoringTime(
      '10-12-2021 15:30:58 GMT-0300',
      '09-12-2021 15:30:58 GMT-0300'
    );
    expect(result).toBeTruthy();
  });
});

describe('helpers/date/resetTimeFromDate', () => {
  test('Should have undefined with undefined', () => {
    const result = resetTimeFromDate();
    expect(result).toBe(undefined);
  });

  test('Should have reset time to 2021-10-12T00:00:00.000Z with 2021-10-12T15:30:50.000Z', () => {
    const result = resetTimeFromDate('2021-10-12T15:30:50.000Z');
    const inst = new Date('2021-10-12T00:00:00.000Z');
    expect(result).toEqual(inst);
  });

  test('Should have reset time to 2020-01-13T00:00:00.000Z 01-13-2020', () => {
    const result = resetTimeFromDate('01-13-2020');
    expect(result).toEqual(new Date('2020-01-13T00:00:00.000Z'));
  });
});

describe('helpers/date/isCurrentMonthAndYear', () => {
  test('Should have false for null value', () => {
    const result = isCurrentMonthAndYear(null);
    expect(result).toBe(false);
  });

  test('Should have false for "" value', () => {
    const result = isCurrentMonthAndYear('');
    expect(result).toBe(false);
  });

  test('Should have true for new Date(2021, 10, 21) value', () => {
    const param = new Date(2021, 10, 21);
    const result = isCurrentMonthAndYear(param);
    expect(result).toBe(true);
  });

  test('Should have true for new Date(2021, 10, 21, 3, 3, 3) value', () => {
    const param = new Date(2021, 10, 21, 3, 3, 3);
    const result = isCurrentMonthAndYear(param);
    expect(result).toBe(true);
  });
});

describe('helpers/date/getMonthByIndex', () => {
  test('Should have February on getMonthByIndex when the index is 1', () => {
    const param = 1;
    const result = getMonthByIndex(param);
    expect(result.label).toEqual('fevereiro');
  });

  test('Should have September on getMonthByIndex when the index is 8', () => {
    const param = 8;
    const result = getMonthByIndex(param);
    expect(result.label).toEqual('setembro');
  });

  test('Should have February on getMonthByIndex when the index is 13', () => {
    const param = 13;
    const result = getMonthByIndex(param);
    expect(result.label).toEqual('fevereiro');
  });

  test('Should have July on getMonthByIndex when the index is 18', () => {
    const param = 18;
    const result = getMonthByIndex(param);
    expect(result.label).toEqual('julho');
  });

  test('Should have December on getMonthByIndex when the index is -1', () => {
    const param = -1;
    const result = getMonthByIndex(param);
    expect(result.label).toEqual('dezembro');
  });

  test('Should have April on getMonthByIndex when the index is -15', () => {
    const param = -15;
    const result = getMonthByIndex(param);
    expect(result.label).toEqual('abril');
  });
});
