import { ImageUpload } from '@types';

export interface UserModel {
  id: string;
  email: string;
  name: string;
  password: string;
  photo?: string | ImageUpload;
  options?: { showPetTrace: boolean; darkMode: boolean };
}
