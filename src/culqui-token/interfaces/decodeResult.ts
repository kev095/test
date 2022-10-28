import ISessionCreditCard from '../interfaces/sessionCreditCard';
/**
 * @deprecated
 */

export type DecodeResult =
  | {
      sessioncreditCard: ISessionCreditCard;
      type: 'valid';
    }
  | {
      type: 'invalid-token';
    };

/**
 * @deprecated
 */

export type ExpirationStatus = 'expired' | 'active';
