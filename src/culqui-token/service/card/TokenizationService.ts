import { encode, TAlgorithm } from 'jwt-simple';
import { CardRepositoryInterface } from "../../repository/card/CardRepositoryInterface";
import { Card } from "../../schema/Card";
import { CardSession } from '../../schema/CardSession';
import Token from "../../schema/Token";
import { TokenizationServiceInterface } from "./TokenizationServiceInterface";

export class TokenizationService implements TokenizationServiceInterface {
  constructor(private readonly repository: CardRepositoryInterface) {}

  tokenizeCard(card: Card): Token {
    const algorithm: TAlgorithm = 'HS512';

    const issued: number = Date.now();
    const fifteenMinutesToMs: number = 15 * 60 * 1000;
    const expires: number = issued + fifteenMinutesToMs;
    const cardSession: CardSession = {
      ...card,
      issued,
      expires
    };

    return {
      token: encode(cardSession, 'secret', algorithm),
      issued,
      expires
    };
  }

  async persist(card: Card, token: Token): Promise<boolean> {
    return await this.repository.save(card, token);
  }
}
