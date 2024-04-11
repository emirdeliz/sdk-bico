
declare module 'sdk-bico' { 
  import { UserModel } from "@models";
  import Joi from 'joi';
  
  const validateUser: (user: UserModel) => Joi.ObjectSchema<UserModel>;
  export { validateUser };
}