import { CategoryModel } from "../Category/CategoryModel";
import { SpecialtyModel } from "../Specialty/SpecialtyModel";
import { UserModel } from "../User/UserModel";

export interface JobModel {
  name: string;
  id: number;
  category: CategoryModel;
  specialty: SpecialtyModel;
  client: UserModel;
  suggestDate: Date;
  suggestPeriod: string;
  observations: string;
  servidaDate: Date;
  servicePeriod: string;
  serviceObservations: string;
  pictures: Array<string>;
}
