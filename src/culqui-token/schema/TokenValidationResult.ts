import { CardSession } from "./CardSession";
import { TokenValidationType } from "./TokenValidationType";

export interface TokenValidationResult {
  session?: CardSession;

  type: TokenValidationType
}
