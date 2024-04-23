import { AddressModel } from "../Address/AddressModel";

export interface UserModel {
  id?: string;
  email: string;
  name: string;
  password: string;
  address: AddressModel;
  phone?: string;
  photo?: string;
  agreeTerms: boolean;
  darkMode: boolean;
}