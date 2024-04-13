import { UserModel } from '@models';
import { buildMessageError } from '../Utils/ValidationUtils';
import * as yup from 'yup';

const schema = yup.object<UserModel>().shape({
  email: yup.string().required('E-mail é obrigatório.').email('Email inválido.'),
  password: yup
    .string()
    .required('Password é obrigatório.')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      'A senha deve conter letras, números, uma letra maiúscula e ter ao menos 8 caracteres.'
    ),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas não são iguais.').required('Entre com a senha novamente.'),
  phone: yup.string().required('Informe o telefone.'),
  agreeTerms: yup.boolean().oneOf([true], 'Aceite os termos de uso.').required('Aceite os termos de uso.'),
});

const validateUser = (user: UserModel) => {
  let error = {} as yup.ValidationError;
  try {
    schema.validateSync(user, { abortEarly: false });
  } catch (e) {
    error = e as yup.ValidationError;
  }
  return buildMessageError(error);
}

export { validateUser }
