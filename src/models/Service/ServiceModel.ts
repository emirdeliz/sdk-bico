import { CategoryModel } from "../Category/CategoryModel";
import { ProviderModel } from "../Provider/ProviderModel";
import { SpecialtyModel } from "../Specialty/SpecialtyModel";

export interface ServiceModel { 
  responsible: ProviderModel;
  category: CategoryModel;
  specialty: SpecialtyModel;
}