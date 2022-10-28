import * as Yup from 'yup';

export const yupValidationError = Yup.ValidationError;
export const validateCreditCard = Yup.object().shape({
  card_number: Yup.string().min(13).max(16),
  cvv: Yup.string().min(3).max(4),
  expiration_month: Yup.string().min(1),
  expiration_year: Yup.string().max(4),
  email: Yup.string().min(5).max(100).email()
});
