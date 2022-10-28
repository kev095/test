import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import CreditCardModel from './models/creditCard';
import db from './config/mongo';
import { encodeCreditCard } from './utils/encodeCreditCard';
import { validateCreditCard, yupValidationError } from './utils/validateCreditCard';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        db().then(() => console.log('Conexion Ready'));

        const reqBody = JSON.parse(event.body as string);

        await validateCreditCard.validate(reqBody);

        const creditCard = {
            ...reqBody,
        };

        const newCreditCard = new CreditCardModel(creditCard);
        const savedCreditCard = await newCreditCard.save();
        if (savedCreditCard) {
            const token = encodeCreditCard('secret');
            response = {
                statusCode: 200,
                body: JSON.stringify(token),
            };
        } else {
            response = {
                statusCode: 500,
                body: JSON.stringify('errror'),
            };
        }
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                error: err instanceof yupValidationError ? err.errors : 'some error happened',
            }),
        };
    }

    return response;
};
