import { SpecialtyModel } from "../Specialty/SpecialtyModel";

export interface SaleModel { 
  id: string;
  specialty: SpecialtyModel;
  percentage: number;
}