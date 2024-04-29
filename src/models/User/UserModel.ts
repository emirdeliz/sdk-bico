export interface UserModel {
  id?: string;
  email: string;
  name: string;
  password: string;
  state: string;
  city: string;
  phone: string;
  photo?: string;
  darkMode: boolean;
}