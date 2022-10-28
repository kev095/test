import { ValidatorInterface } from "./ValidatorInterface";

export abstract class AbstractValidator implements ValidatorInterface {
  constructor(
    private readonly regex: RegExp,
    public readonly errorMessage: string,
  ) {}

  validate(value: any): boolean {
    return value && this.regex.test(value);
  }
}
