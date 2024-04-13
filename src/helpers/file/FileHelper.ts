import { GenericObject } from '@types';
import { formatPath, removeSpecialCaracteres } from '../string/StringHelper';

export const prepareImageToUpload = (object: GenericObject, atributeUpload: string) => {
  const value = object[atributeUpload];
  if (value && value.base64) {
    const formattedPath = formatPath(value?.path);
    object[atributeUpload] = { ...value, path: `image.${formattedPath}` };
  }
  return object;
};

export const getFileNameWithoutExtension = (fullFileName: string): string => {
  const [, ...rest] = fullFileName.split('.').reverse();
  return rest.reverse().join('');
};

export const isValidExtension = (
  fullFileName: string,
  extension: 'rem' | 'png' | 'pdf' | 'txt'
): boolean => getExtension(fullFileName).toLocaleLowerCase() === extension;

export const isValidExtensionCNAB = (fullFileName: string): boolean =>
  isValidExtension(fullFileName, 'rem') || isValidExtension(fullFileName, 'txt');

export const getExtension = (fullFileName: string): string => {
  const [extension] = fullFileName.split('.').reverse();
  return extension.toLocaleLowerCase();
};

export const normalizeFileName = (fullFileName: string): string => {
  const fileName = getFileNameWithoutExtension(fullFileName);
  return `${removeSpecialCaracteres(fileName)}.${getExtension(fullFileName)}`;
};

export const isValidPDFExtension = (document: File) => {
  const extension = `.${getExtension(document.name)}`;
  return ['.pdf'].includes(extension) && ['application/pdf'].includes(document.type);
};

export const isValidJPGExtension = (document: File): boolean => {
  const extension = `.${getExtension(document.name)}`;
  return (
    ['.jpg', '.jpeg'].includes(extension) && ['image/jpg', 'image/jpeg'].includes(document.type)
  );
};

export const isValidPNGExtension = (document: File) => {
  const extension = `.${getExtension(document.name)}`;
  return ['.png'].includes(extension) && ['image/png'].includes(document.type);
};
