import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export interface HandlerInterface {
  process(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
}
