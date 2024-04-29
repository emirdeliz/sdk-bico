import { prepareImageToUpload } from '@helpers';
import { UserModel } from '@models';
import { Api } from '../../base/ApiBase';

const URL_USER_BASE = 'customer';

export interface AuthUserResponse {
  token: string;
}

export const getUserApi = async () => await Api<UserModel>().get({ url: URL_USER_BASE });

export const updateUserApi = async (user: UserModel) =>
  await Api<UserModel>().put({
    url: URL_USER_BASE,
    body: prepareImageToUpload(user, 'photo'),
  });

export const createUserApi = async (user: UserModel) =>
  (await Api<UserModel>().post({
    url: URL_USER_BASE,
    body: user,
  })) as UserModel;

export const deleteAccountApi = async () => {
  return await Api<UserModel>().del({ url: URL_USER_BASE });
};

export const resetPasswordApi = async (email: string) =>
  await Api<UserModel>().get({ url: `${URL_USER_BASE}/resetpwd/${email}` });

export const authUserApi = async (email: string, password: string) => {
  const result = await Api<AuthUserResponse>().post({
    url: 'auth/login',
    body: {
      email,
      password,
    },
  });
  return result as AuthUserResponse;
};
