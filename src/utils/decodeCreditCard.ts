import { decode, TAlgorithm } from 'jwt-simple';
import ISessionCreditCard from '../interfaces/sessionCreditCard';
import { DecodeResult } from '../interfaces/decodeResult';

export function decodeCreditCard(tokenCreditCard: string): DecodeResult {
  const algorithm: TAlgorithm = 'HS512';

  let result: ISessionCreditCard;

  try {
    result = decode(tokenCreditCard, 'secret', false, algorithm);
  } catch (err) {
    return { type: 'invalid-token' };
  }

  return {
    type: 'valid',
    sessioncreditCard: result
  };
}
