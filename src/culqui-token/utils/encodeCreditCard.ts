import EncodeResult from '../interfaces/encodeResult';
import { encode, TAlgorithm } from 'jwt-simple';
import ICreditCard from '../interfaces/creditCard';
import ISessionCreditCard from '../interfaces/sessionCreditCard';

export function encodeCreditCard(creditCard: ICreditCard): EncodeResult {
    // Always use HS512 to sign the token
    const algorithm: TAlgorithm = 'HS512';
    // Determine when the token should expire
    const issued = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;
    const sessionCreditCard: ISessionCreditCard = {
        ...creditCard,
        issued: issued,
        expires: expires,
    };

    return {
        token: encode(sessionCreditCard, 'secret', algorithm),
        issued: issued,
        expires: expires,
    };
}
