import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import CreditCardModel from './models/creditCard';
import db from './config/mongo';
import { encodeCreditCard } from './utils/encodeCreditCard';
import { validateCreditCard, yupValidationError } from './utils/validateCreditCard';

db().then(() => console.log('Conexion Ready'));

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify('token okokkk'),
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};

export const tokenHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
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
