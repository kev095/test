import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import CreditCardModel from './models/creditCard';
import db from './config/mongo';
import { encodeCreditCard } from './utils/encodeCreditCard';
import { validateCreditCard, yupValidationError } from './utils/validateCreditCard';
import { DecodeResult } from './interfaces/decodeResult';
import { decodeCreditCard } from './utils/decodeCreditCard';
import { checkExpirationStatus } from './utils/checkExpirationStatus';

db().then(() => console.log('Conexion Ready'));

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    try {
        const token = event.headers.Authorization as string;
        const PK = event.headers.pk;
        if (!PK) {
            response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'pk is invalid',
                }),
            };
            return response;
        }

        const decode: DecodeResult = decodeCreditCard(token);
        if (decode.type === 'invalid-token') {
            response = {
                statusCode: 500,
                body: JSON.stringify({ error: 'invalid token' }),
            };
        }
        const expiration = checkExpirationStatus(decode.sessioncreditCard);
        if (expiration === 'expired') {
            response = {
                statusCode: 500,
                body: JSON.stringify({ mess: 'token has expired' }),
            };
        } else if (expiration === 'active') {
            const { email, card_number, expiration_year, expiration_month } = decode.sessioncreditCard;
            response = {
                statusCode: 200,
                body: JSON.stringify({ email, card_number, expiration_year, expiration_month }),
            };
        }
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened --',
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

        const token = encodeCreditCard(creditCard);
        const newCreditCard = new CreditCardModel({ ...creditCard, token: token.token });
        const savedCreditCard = await newCreditCard.save();
        if (savedCreditCard) {
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
                error: err instanceof yupValidationError ? err.errors : 'some error   happened',
            }),
        };
    }

    return response;
};
