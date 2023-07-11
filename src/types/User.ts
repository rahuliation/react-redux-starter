import * as yup from 'yup';

export const userSchema = yup
  .object({
    firstName: yup.string().label('First Name').required(),
    lastName: yup.string().label('Last Name').required(),
    email: yup.string().label('Email').required(),
  })
  .required();

export type UserInput = yup.InferType<typeof userSchema>;

export interface User extends Omit<UserInput, 'confirmPassword' | 'password'> {
  id: number;
}

export const loginSchema = yup
  .object({
    email: yup.string().label('Email').required(),
    password: yup.string().label('Password').required(),
  })
  .required();

export type LoginInput = yup.InferType<typeof loginSchema>;
