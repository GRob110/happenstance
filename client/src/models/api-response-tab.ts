import { AppError } from "./app-error";
import { Tab } from "./tab";

export interface ApiResponseTab {
  data: Tab | null;
  error: AppError | null;
}
