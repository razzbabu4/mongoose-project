import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    password: z.string({
      required_error: 'Id is required',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password required',
    }),
    newPassword: z.string({
      required_error: 'Id is required',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
