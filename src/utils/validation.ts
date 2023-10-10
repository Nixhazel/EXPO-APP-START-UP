import i18next from 'i18next';
import * as Yup from 'yup';

export enum Validation {
  EMAIL = 'email',
  PASSWORD = 'password',
  CODE = 'code',
}

type ValidationSchema = Record<string, Validation>;

const trans = i18next.t.bind(i18next);

const SCHEMA_DICTIONARY = {
  [Validation.EMAIL]: Yup.string()
    .email(trans('Enter a valid email address'))
    .required(trans('Email is required')),

  [Validation.PASSWORD]: Yup.string()
    .min(8, trans('Password must be at least 8 characters in length'))
    .required(trans('Please enter a password')),

  [Validation.CODE]: Yup.string()
    .required(trans('Please enter a code'))
    .matches(/^[0-9]{6}$/, 'Please enter the 6-digit verification code'),
};

export const createValidation = (schema: ValidationSchema): Yup.AnyObject => {
  const shape: Yup.ObjectShape = {};

  for (const key of Object.keys(schema)) {
    const validation = schema[key];
    shape[key] = SCHEMA_DICTIONARY[validation];
  }

  return Yup.object(shape);
};
