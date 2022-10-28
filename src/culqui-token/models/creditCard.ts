import { Schema, model } from 'mongoose';
import ICreditCard from '../interfaces/creditCard';

const CreditCardSchema = new Schema<ICreditCard>({
    email: { type: String },
    card_number: { type: Number },
    cvv: { type: Number },
    expiration_year: { type: String },
    expiration_month: { type: String },
    token: { type: String },
});

export default model('CreditCard', CreditCardSchema);
