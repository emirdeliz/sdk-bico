import * as yup from 'yup';

const MESSAGE_BASE = 'Por favor, verifique os campos abaixo.';

export const buildMessageError = (errors: yup.ValidationError) => {
  if (!errors.inner) {
    return {
      hasError: false,
      messageError: ''
    }
  }

  const yupErrors = [] as Array<string>;
  errors.errors.forEach((error) => {
    yupErrors.push(`-${error} \n`);
  });

  return {
    hasError: true,
    messageError: `${MESSAGE_BASE}\n\n${yupErrors.join('')}.` 
  };
}