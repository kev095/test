import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerInterface } from "./HandlerInterface";

export class TokenHandler implements HandlerInterface {
  process(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    throw new Error("Method not implemented.");
  }
}
