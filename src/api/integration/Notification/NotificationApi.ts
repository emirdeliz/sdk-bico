import { Api } from '../../base/ApiBase';

const URL_NOTIFICATION_BASE = 'register/mobile';

export const registerNotificationTokenApi = async (token: string) => {
  return (await Api<string>().post({
    url: URL_NOTIFICATION_BASE,
    body: { mobileToken: token },
  })) as string;
};

export const resetNotificationTokenApi = async () => {
  return (await Api<string>().post({
    url: URL_NOTIFICATION_BASE,
    body: { mobileToken: 'reset' },
  })) as string;
};
