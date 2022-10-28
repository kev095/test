import { AbstractValidator } from "./AbstractValidator"

export class CardValidator extends AbstractValidator {
  constructor() {
    super(
      /^\d{13,16}$/,
      "Card number must contains between 13 and 16 numbers"
    );
  }
}

export const cardValidator = new CardValidator();
