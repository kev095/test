import ISessionCreditCard from '../interfaces/sessionCreditCard';
export type DecodeResult =
    | {
          sessioncreditCard: ISessionCreditCard;
          type: 'valid';
      }
    | {
          type: 'invalid-token';
      };

export type ExpirationStatus = 'expired' | 'active';
