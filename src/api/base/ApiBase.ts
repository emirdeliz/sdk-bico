import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { GenericObject } from '@types';
import { API_BASE_URL } from '@constants';
// import { getTokenStorage } from '@storage';
import { handleDateToISOString, handleStringToDate, keysToCamel, keysToSnake } from '@helpers';

interface GetRequestParams {
  url: string;
}

interface PostRequestParams<BodyDataType> extends GetRequestParams {
  body?: BodyDataType;
}

interface DeleteRequestParams<BodyDataType> extends PostRequestParams<BodyDataType> {}

interface PutRequestParams<BodyDataType> extends PostRequestParams<BodyDataType> {}

interface PatchRequestParams<BodyDataType> extends PostRequestParams<BodyDataType> {}

interface ApiResponse<T> {
  result?: T;
}

export interface ApiHeadersCustom {
  headers?: AxiosRequestHeaders;
}

const buildUrlQueryParams = (url: string, params: GenericObject = {}) => {
  const result = Object.keys(params).reduce(
    (result: string, key: string) => result.replace(`{${key}}`, params[key]),
    url
  );
  return result;
};

export const buildHeaders = async ({ headers }: ApiHeadersCustom): Promise<GenericObject> => {
  const storageToken = ''; // await getTokenStorage();
  const token = storageToken;
  const header = {
    common: { token },
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    cors: 'no-cors',
    mode: 'no-cors',
    ...headers,
  };
  return header;
};

export const getAxiosInstance = async ({ headers }: ApiHeadersCustom = {}) => {
  const baseURL = API_BASE_URL;
  const axiosInstance = axios.create({
    baseURL,
    headers: await buildHeaders({ headers }),
  });
  return axiosInstance;
};

export const Api = <T>(headersCustom?: ApiHeadersCustom) => {
  const get = async ({ url }: GetRequestParams, queryParams?: GenericObject) => {
    try {
      const instance = await getAxiosInstance(headersCustom);
      const { data } = await instance.get<T, AxiosResponse<T>>(
        buildUrlQueryParams(url, queryParams)
      );

      const keyResult = 'result' as keyof T;
      const result = data[keyResult] || data;
      return handleStringToDate(keysToCamel(result) as ApiResponse<T>);
    } catch (e) {
      console.log('Error', `${e} => ${url}`);
    }
  };

  const all = async ({ url }: GetRequestParams, queryParams?: GenericObject) => {
    try {
      const instance = await getAxiosInstance(headersCustom);
      const { data } = await instance.get<T, AxiosResponse<Array<T>>>(
        buildUrlQueryParams(url, queryParams)
      );
      return handleStringToDate(keysToCamel(data) as ApiResponse<T>).result as Array<T>;
    } catch (e) {
      console.log('Error', `${e} => ${url}`);
    }
  };
  const post = async (
    { url, body }: PostRequestParams<GenericObject>,
    queryParams?: GenericObject
  ) => {
    try {
      const instance = await getAxiosInstance(headersCustom);
      const { data } = await instance.post<T>(
        buildUrlQueryParams(url, queryParams),
        handleDateToISOString(keysToSnake(body))
      );
      const result = keysToCamel(data) as ApiResponse<T>;
      return result.result || result;
    } catch (e) {
      console.log('Error', `${e} => ${url}`);
    }
  };

  const del = async (
    { url, body }: DeleteRequestParams<GenericObject>,
    queryParams?: GenericObject
  ) => {
    try {
      const instance = await getAxiosInstance(headersCustom);
      const { data } = await instance.delete<AxiosResponse<T>>(
        buildUrlQueryParams(url, queryParams),
        keysToSnake(body) as AxiosRequestConfig
      );
      return (keysToCamel(data) as ApiResponse<T>).result;
    } catch (e) {
      console.log('Error', `${e} => ${url}`);
    }
  };

  const put = async (
    { url, body }: PutRequestParams<GenericObject>,
    queryParams?: GenericObject
  ) => {
    try {
      const instance = await getAxiosInstance(headersCustom);
      const { data } = await instance.put<AxiosResponse<T>>(
        buildUrlQueryParams(url, queryParams),
        handleDateToISOString(keysToSnake(body || {}))
      );
      return (keysToCamel(data.data) as ApiResponse<T>)?.result;
    } catch (e) {
      console.log('Error', `${e} => ${url}`);
    }
  };

  const patch = async (
    { url, body }: PatchRequestParams<GenericObject>,
    queryParams?: GenericObject
  ) => {
    try {
      const instance = await getAxiosInstance(headersCustom);
      const { data } = await instance.patch<AxiosResponse<T>>(
        buildUrlQueryParams(url, queryParams),
        handleDateToISOString(keysToSnake(body))
      );
      return (keysToCamel(data.data) as ApiResponse<T>).result;
    } catch (e) {
      console.log('Error', `${e} => ${url}`);
    }
  };

  return { get, all, post, del, put, patch };
};
