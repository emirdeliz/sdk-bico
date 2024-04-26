import { CategoryModel } from "../Category/CategoryModel";
import { ProviderModel } from "../Provider/ProviderModel";
import { SpecialtyModel } from "../Specialty/SpecialtyModel";

export interface SaleModel { 
  id: string;
  specialty: SpecialtyModel;
  percentage: number;
}