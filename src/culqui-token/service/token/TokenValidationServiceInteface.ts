import { TokenValidationResult } from "../../schema/TokenValidationResult";

export interface TokenValidationServiceInterface {
  validate(token: string): TokenValidationResult;
}
