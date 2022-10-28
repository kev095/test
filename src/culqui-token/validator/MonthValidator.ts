import { AbstractValidator } from "./AbstractValidator"

export class MonthValidator extends AbstractValidator {
  constructor() {
    super(
      /^\d{1,2}$/,
      "Month must contains 1 or 2 numbers"
    );
  }
}

export const monthValidator = new MonthValidator();
