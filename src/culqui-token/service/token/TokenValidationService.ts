import { decode, TAlgorithm } from 'jwt-simple';
import { CardSession } from "../../schema/CardSession";
import { TokenValidationResult } from "../../schema/TokenValidationResult";
import { TokenValidationType } from "../../schema/TokenValidationType";
import { TokenValidationServiceInterface } from "./TokenValidationServiceInteface";

export class TokenValidationService implements TokenValidationServiceInterface {
  constructor(private readonly decAlgorithm: TAlgorithm = 'HS512') {}

  validate(token: string): TokenValidationResult {
    const result: TokenValidationResult = { type: TokenValidationType.INVALID };

    let session: CardSession;

    try {
      session = decode(
        token,
        'secret',
        false,
        this.decAlgorithm
      );
    } catch (err: unknown) {
      return result;
    }

    result.type = TokenValidationType.VALID;
    result.session = session;

    return result;
  }
}
