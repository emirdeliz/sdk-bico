import { UserModel } from '@models';
import * as Joi from 'joi';

const validateUser = (user: UserModel) => {
  const result = Joi.object<UserModel>({
    name: Joi.string().required().message('Informe o nome'),
    password: Joi.string().required().min(8).message('Informe a senha'),
    passwordRepeat: Joi.string().required().min(8).message('Informa a senha novamente'),
    email: Joi.string().email().required().message('Email inválido'),
    phone: Joi.string().required().message('Informe o telefone'),
    agreeToTerms: Joi.boolean().valid(true).required().message('Aceite os termos de uso'),
  })
  return result;
}

export { validateUser }
