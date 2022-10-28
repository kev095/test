import { AbstractValidator } from "./AbstractValidator"

export class YearValidator extends AbstractValidator {
  constructor() {
    super(
      /^\d{4,4}$/,
      "Year must contains 4 numbers"
    );
  }
}

export default new YearValidator();
