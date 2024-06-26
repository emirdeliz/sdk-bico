import { CategoryModel } from "../Category/CategoryModel";
import { ProviderModel } from "../Provider/ProviderModel";
import { SpecialtyModel } from "../Specialty/SpecialtyModel";

export interface ServiceModel { 
  id: string;
  responsible: ProviderModel;
  category: CategoryModel;
  specialty: SpecialtyModel;
}