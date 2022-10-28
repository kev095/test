import CardModel from '../../model/Card';
import { Card } from '../../schema/Card';
import Token from '../../schema/Token';
import { CardRepositoryInterface } from './CardRepositoryInterface';

export class CardRepository implements CardRepositoryInterface{
  async save(card: Card, cardToken: Token): Promise<boolean> {
    const storableCard = new CardModel({
      ...card,
      token: cardToken.token
    });

    const savedCard = await storableCard.save();

    if (savedCard) {
      return true;
    }

    return false;
  }
}
