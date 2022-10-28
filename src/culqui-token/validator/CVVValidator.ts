import { AbstractValidator } from "./AbstractValidator"

export class CVVValidator extends AbstractValidator {
  constructor() {
    super(
      /^\d{3,4}$/,
      "CVV must contain 3 or 4 numbers"
    );
  }
}
export const cvvValidator = new CVVValidator();
