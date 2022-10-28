import { AbstractValidator } from "./AbstractValidator";

export class EmailValidator extends AbstractValidator {
  constructor() {
    super(
      /^\w{5,100}@(gmail\.com|hotmail\.com|yahoo\.es)$/,
      "Email must contain gmail.com or hotmail.com or yahoo.es and between 5 and 100 chars"
    );
  }
}

export const emailValidator = new EmailValidator();
