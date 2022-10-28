import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { TokenValidationResult } from "../schema/TokenValidationResult";
import { TokenValidationType } from "../schema/TokenValidationType";
import { TokenValidationServiceInterface } from "../service/token/TokenValidationServiceInteface";
import { HandlerInterface } from "./HandlerInterface";

 export class TokenValidationHandler implements HandlerInterface {
  constructor(private readonly service: TokenValidationServiceInterface) {}

  async process(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      body: ''
    };

    try {
      const authToken: string = <string>event.headers.Authorization;
      const privateKey: string = <string>event.headers.pk;

      if (!privateKey) {
        response.body = JSON.stringify({ message: 'pk is invalid'});

        return response;
      }

      const tokenValidationResult: TokenValidationResult = this.service.validate(authToken);

      if (tokenValidationResult.type === TokenValidationType.INVALID) {
        response.body = JSON.stringify({
          message: 'token has expired',
        });
      }

      if (!tokenValidationResult.session) {
        response.body = JSON.stringify({
          message: 'invalid card session'
        });

        return response;
      }

      const {
        card_number,
        expiration_year,
        expiration_month
      } = tokenValidationResult.session;

      response.statusCode = 200;
      response.body = JSON.stringify({
        card_number,
        expiration_year,
        expiration_month
      });
    } catch (err: unknown) {
      console.log(err);

      if (err instanceof Error) {
        response.body = JSON.stringify({
          message: err.message,
          stackTrace: err.stack
        });
      }

      response.body = JSON.stringify({
        message: 'cant trace error something wrong happened'
      });
    }

    return response;
  }
 }
