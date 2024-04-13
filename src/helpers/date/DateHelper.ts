import { GenericObject } from '@types';
import * as helper from '../string/StringHelper';

export const checkingIfDateIsGreaterThanAnotherIgnoringTime = (
  date?: Date | string,
  dateToCompare?: Date | string
) => {
  const dateBase = resetTimeFromDate(date ? new Date(date) : undefined);
  const dateToCompareBase = resetTimeFromDate(dateToCompare ? new Date(dateToCompare) : undefined);
  return !!dateBase && !!dateToCompareBase && dateBase > dateToCompareBase;
};

export const resetTimeFromDate = (date?: Date | string) => {
  const dateBase = date ? new Date(date) : undefined;
  if (!dateBase) {
    return undefined;
  }

  const dateReset = new Date(dateBase);
  dateReset.setUTCHours(0, 0, 0, 0);
  return dateReset;
};

export const isCurrentMonthAndYear = (date?: Date | string | null) => {
  const dateBase = date ? new Date(date) : undefined;
  if (!dateBase) {
    return false;
  }

  const currentDate = new Date();
  return (
    dateBase.getMonth() === currentDate.getMonth() &&
    dateBase.getFullYear() === currentDate.getFullYear()
  );
};

export const isCurrentDayMonthAndYear = (date?: Date | string | null) => {
  const dateBase = date ? new Date(date) : undefined;
  if (!dateBase) {
    return false;
  }

  const currentDate = new Date();
  return isCurrentMonthAndYear(date) && dateBase.getDate() === currentDate.getDate();
};

export const formatDateAsYYYYMMDD = (date?: Date | string | null) =>
  date ? new Date(date).toLocaleDateString('pt-BR') : '';

export const parseStringDDMMYYYYToDate = (date?: string) => {
  const isValidDate = checkStringHasValidDate(date);
  if (!isValidDate) {
    return null;
  }

  const dateOnlyNumbers = helper.getNumbersOfString(date);
  const day = dateOnlyNumbers.substring(0, 2);
  const month = dateOnlyNumbers.substring(2, 4);
  const year = dateOnlyNumbers.substring(4, 8);

  const hasAllNumbers = day.length === 2 && month.length === 2 && year.length === 4;
  return hasAllNumbers ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
};

export const checkStringHasValidDate = (date?: string) => {
  if (!date || date.toString() == parseInt(date).toString()) {
    return false;
  }
  const tryDate = new Date(date);
  return (
    tryDate &&
    tryDate.getFullYear() > 1970 &&
    tryDate.toString() != 'NaN' &&
    String(tryDate) !== 'Invalid Date'
  );
};

export enum MonthLabel {
  January = 'janeiro',
  February = 'fevereiro',
  March = 'março',
  April = 'abril',
  May = 'maio',
  June = 'junho',
  July = 'julho',
  August = 'agosto',
  September = 'setembro',
  October = 'outubro',
  November = 'novembro',
  December = 'dezembro',
}

export enum WeekLabel {
  Domingo = 'domingo',
  Segunda = 'segunda',
  Terca = 'terça',
  Quarta = 'quarta',
  Quinta = 'quinta',
  Sexta = 'sexta',
  Sabado = 'sábado',
}

export type MonthValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type WeekValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Month {
  label: MonthLabel;
  value: MonthValue;
}

export interface Week {
  label: WeekLabel;
  value: WeekValue;
}

export const MonthLabelValue = [
  { label: MonthLabel.January, value: 1 },
  { label: MonthLabel.February, value: 2 },
  { label: MonthLabel.March, value: 3 },
  { label: MonthLabel.April, value: 4 },
  { label: MonthLabel.May, value: 5 },
  { label: MonthLabel.June, value: 6 },
  { label: MonthLabel.July, value: 7 },
  { label: MonthLabel.August, value: 8 },
  { label: MonthLabel.September, value: 9 },
  { label: MonthLabel.October, value: 10 },
  { label: MonthLabel.November, value: 11 },
  { label: MonthLabel.December, value: 12 },
] as Array<Month>;

export const WeekLabelValue = [
  { label: WeekLabel.Domingo, value: 1 },
  { label: WeekLabel.Segunda, value: 2 },
  { label: WeekLabel.Terca, value: 3 },
  { label: WeekLabel.Quarta, value: 4 },
  { label: WeekLabel.Quinta, value: 5 },
  { label: WeekLabel.Sexta, value: 6 },
  { label: WeekLabel.Sabado, value: 7 },
] as Array<Week>;

export const getMonthByIndex = (index: number = -1) => {
  let monthIndex = index;

  if (index < 0) {
    monthIndex = 12 - monthIndex * -1;
    monthIndex = monthIndex < 0 ? monthIndex * -1 : monthIndex;
  }

  if (index >= 12) {
    monthIndex -= 12;
  }

  const month = MonthLabelValue[monthIndex];
  return month;
};

export const formatDateAsDDMMYYYY = (date?: Date | string | null) =>
  date ? new Date(date).toLocaleDateString('pt-BR') : '';

export const formatDateAsDDMMYYYYAndTime = (date?: Date | string | null) => {
  const dateFormatted = formatDateAsDDMMYYYY(date);
  const timeFormatted = formatDateAsTime(date);
  return `${dateFormatted} - ${timeFormatted}`;
};

export const formatDateAsTime = (date?: Date | string | null) => {
  const timeAsString = new Date(String(date))?.toTimeString();
  return date ? timeAsString.split(' ')[0] : '';
};

interface PlusDateProps {
  plusYears?: number;
  plusMonths?: number;
  plusDays?: number;
  plusHours?: number;
  plusMinutes?: number;
  plusSeconds?: number;
}

export const getCurrentDateWithPlusTime = (props?: PlusDateProps): Date => {
  const {
    plusYears = 0,
    plusMonths = 0,
    plusDays = 0,
    plusHours = 0,
    plusMinutes = 0,
    plusSeconds = 0,
  } = props || {};

  return new Date(
    new Date().getFullYear() + plusYears,
    new Date().getMonth() + plusMonths,
    new Date().getDate() + plusDays,
    new Date().getHours() + plusHours,
    new Date().getMinutes() + plusMinutes,
    new Date().getSeconds() + plusSeconds
  );
};

export const getMonthDifference = (startDate: Date, endDate: Date) => {
  const result =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());

  if (result < 0) {
    return result * -1;
  }
  return result;
};

export const isIsoDateString = (value: GenericObject) => {
  const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)Z?$/;
  return value && isoDateFormat.test(String(value));
};

export const handleStringToDate = (body: GenericObject) =>
  JSON.parse(JSON.stringify(body), (_key, value) =>
    isIsoDateString(value) ? new Date(value) : value
  );

export const handleDateToISOString = (body: GenericObject) =>
  JSON.parse(JSON.stringify(body), (_key, value) =>
    checkStringHasValidDate(value) ? new Date(value).toISOString() : value
  );
