import { ExpirationStatus } from '../interfaces/decodeResult';
import ISessionCreditCard from '../interfaces/sessionCreditCard';

export function checkExpirationStatus(sessionCreditCard: ISessionCreditCard): ExpirationStatus {
    const now = Date.now();
    if (sessionCreditCard.expires > now) return 'active';

    return 'expired';
}
