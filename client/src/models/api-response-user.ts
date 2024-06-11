import { AppError } from "./app-error";
import { UserStored } from "./user-stored";

export interface ApiResponseUser {
  data: UserStored | null;
  error: AppError | null;
}
