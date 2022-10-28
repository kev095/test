import { Card } from "../../schema/Card";
import Token from "../../schema/Token";

export interface CardRepositoryInterface {
  save(card: Card, cardToken: Token): Promise<boolean>;
}
