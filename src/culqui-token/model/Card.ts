import { Schema, model } from 'mongoose';
import { Card } from '../schema/Card';
import { cardValidator } from '../validator/CardValidator';
import { cvvValidator } from '../validator/CVVValidator';
import { emailValidator } from '../validator/EmailValidator';
import { monthValidator } from '../validator/MonthValidator';
import { yearValidator } from '../validator/YearValidator';

const CardSchema = new Schema<Card>({
  email: {
    type: String,
    validate: {
      validator: emailValidator.validate,
      message: emailValidator.errorMessage
    },
  },
  card_number: {
    type: Number,
    validate: {
      validator: cardValidator.validate,
      message: cardValidator.errorMessage
    }
  },
  cvv: {
    type: Number,
    validate: {
      validator: cvvValidator.validate,
      message: cvvValidator.errorMessage
    }
  },
  expiration_year: {
    type: String,
    validate: {
      validator: yearValidator.validate,
      message: yearValidator.errorMessage
    }
  },
  expiration_month: {
    type: String,
    validate: {
      validator: monthValidator.validate,
      message: monthValidator.errorMessage
    }
  },
  token: { type: String }
});

export default model('Card', CardSchema);
