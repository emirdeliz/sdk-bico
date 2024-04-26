import { JobModel } from "../Job/JobModel";
import { RateModel } from "../Rate/RateModel";
import { UserModel } from "../User/UserModel";

export interface ConsumerRateModel {
  consumer: UserModel;
  job: JobModel;
  id: number;
  value: number;
  rates: Array<RateModel>;
  description: string;
}
