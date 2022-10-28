import { Card } from "../../schema/Card";
import Token from "../../schema/Token";

export interface TokenizationServiceInterface {
  tokenizeCard(card: Card): Token;

  persist(card: Card, token: Token): Promise<boolean>
}
