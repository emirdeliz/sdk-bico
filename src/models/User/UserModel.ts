export interface UserModel {
  id?: string;
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
  phone?: string;
  photo?: string;
  agreeTerms: boolean;
  options?: { darkMode: boolean };
}