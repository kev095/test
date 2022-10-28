import { Schema, model, Model, Types } from 'mongoose';
import { number } from 'yup';
import ICreditCard from '../interfaces/creditCard';

const CreditCardSchema = new Schema<ICreditCard>({
    email: { type: String },
    card_number: { type: Number },
    cvv: { type: Number },
    expiration_year: { type: String },
    expiration_month: { type: String },
});

export default model('CreditCard', CreditCardSchema);
