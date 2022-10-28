import { Schema, model } from 'mongoose';
import { Card } from '../schema/Card';
import CardValidator from '../validator/CardValidator';
import CVVValidator from '../validator/CVVValidator';
import EmailValidator from '../validator/EmailValidator';
import MonthValidator from '../validator/MonthValidator';
import YearValidator from '../validator/YearValidator';

const CardSchema = new Schema<Card>({
  email: {
    type: String,
    validate: {
      validator: EmailValidator.validate,
      message: EmailValidator.errorMessage
    },
  },
  card_number: {
    type: Number,
    validate: {
      validator: CardValidator.validate,
      message: CardValidator.errorMessage
    }
  },
  cvv: {
    type: Number,
    validate: {
      validator: CVVValidator.validate,
      message: CVVValidator.errorMessage
    }
  },
  expiration_year: {
    type: String,
    validate: {
      validator: YearValidator.validate,
      message: YearValidator.errorMessage
    }
  },
  expiration_month: {
    type: String,
    validate: {
      validator: MonthValidator.validate,
      message: MonthValidator.errorMessage
    }
  },
  token: { type: String }
});

export default model('Card', CardSchema);
