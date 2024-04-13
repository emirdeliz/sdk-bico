import { getFileNameWithoutExtension, isValidExtension, getExtension } from './FileHelper';

describe('helpers/file/FileHelper', () => {
  test('Should be returned only file name without extension', () => {
    const result = getFileNameWithoutExtension('fileName.png');
    expect(result).toEqual('fileName');
  });

  test('Should valid .pdf extension', () => {
    const result = isValidExtension('fileName.pdf', 'pdf');
    expect(result).toBeTruthy();
  });

  test('Should not valid .pdf extension', () => {
    const result = isValidExtension('fileName.png', 'pdf');
    expect(result).toBeFalsy();
  });

  test('Should valid .png extension', () => {
    const result = isValidExtension('fileName.png', 'png');
    expect(result).toBeTruthy();
  });

  test('Should not valid .png extension', () => {
    const result = isValidExtension('fileName.pdf', 'png');
    expect(result).toBeFalsy();
  });

  test('Should valid .rem extension', () => {
    const result = isValidExtension('fileName.rem', 'rem');
    expect(result).toBeTruthy();
  });

  test('Should not valid .rem extension', () => {
    const result = isValidExtension('fileName.ret', 'rem');
    expect(result).toBeFalsy();
  });

  test('Should be returned the extension', () => {
    const result = getExtension('fileName.pdf');
    expect(result).toEqual('pdf');
  });
});
