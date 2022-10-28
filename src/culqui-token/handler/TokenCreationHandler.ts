import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Card } from "../schema/Card";
import Token from "../schema/Token";
import { TokenizationServiceInterface } from "../service/card/TokenizationServiceInterface";
import { validateCreditCard } from "../utils/validateCreditCard";
import { HandlerInterface } from "./HandlerInterface";

export class TokenCreationHandler implements HandlerInterface {
  constructor (private readonly service: TokenizationServiceInterface) {}

  async process(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      body: ''
    };

    try {
      const requestBody = JSON.parse(event.body as string);

      await validateCreditCard.validate(requestBody);

      const card: Card = { ...requestBody };
      const cardToken: Token = this.service.tokenizeCard(card);

      const wasCardSaved = await this.service.persist(
        card,
        cardToken
      );

      if (wasCardSaved) {
        response.statusCode = 200;
        response.body = JSON.stringify(cardToken);

        return response;
      }

      response.body = JSON.stringify({
        message: 'unable to save card into database, please check the connection'
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
