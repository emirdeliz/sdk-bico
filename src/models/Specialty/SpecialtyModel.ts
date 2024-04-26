import { CategoryModel } from "../Category/CategoryModel";

export interface SpecialtyModel {
  name: string;
  id: number;
  category: CategoryModel;
}
