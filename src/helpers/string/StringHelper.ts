export const splitStringBySegmentLength = (
  source: string,
  skipCharacterIndex: number = 0,
  segmentLength: number
) => {
  const chunks = [];
  for (
    let i = 0, charsLength = source.length;
    i < charsLength;
    i += segmentLength + skipCharacterIndex
  ) {
    chunks.push(source.substring(i, i + segmentLength));
  }
  return chunks;
};

export const replaceByIndex = (
  target: string,
  replaceTo: string,
  startIndex: number,
  endIndex: number
) => {
  if (startIndex < 0 || endIndex > target.length) {
    return target;
  }

  return `${target.substring(0, startIndex)}${replaceTo}${target.substring(endIndex)}`;
};

export const removeSpecialCaracteres = (str: string) =>
  (str || '')
    .replaceAll(' ', '')
    .replaceAll('.', '')
    .replaceAll(/[^a-zA-Z0-9.]/g, '');

export const getNumbersOfString = (str?: string) => (str || '').replace(/\D/g, '');

export const limitText = (
  text: string = '',
  limitCaracteres: number = 5,
  addEllipsis: boolean = false
): string => {
  const MINIMUM_OF_CARACTERES = 1;
  const START_INDEX = 0;
  const TEXT_LENGTH = text.length;
  let str = text;

  if (limitCaracteres < MINIMUM_OF_CARACTERES || !text) {
    return '';
  }

  if (limitCaracteres < TEXT_LENGTH) {
    str = text.substring(START_INDEX, limitCaracteres);
  }

  if (addEllipsis && TEXT_LENGTH > limitCaracteres) {
    str += '...';
  }

  return str;
};

export const formatPath = (path: string): string =>
  path?.substring((path || '')?.length - 5)?.split('.')?.[1];

export const validatePasswordComplexity = (password: string) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return regex.test(password);
}