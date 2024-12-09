import { z } from 'zod';

// Zod schemas for embedded documents
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .nonempty({ message: 'First Name is required' }),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty({ message: 'Last Name is required' }),
});

// Main Admin schema
export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .max(20, { message: 'Password cannot be more than 20 characters' }),
    admin: z.object({
      name: createUserNameValidationSchema,
      designation: z.string().min(1, 'Designation is required'),
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: "Gender must be 'male', 'female', or 'other'",
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: 'Invalid email address' })
        .nonempty({ message: 'Email is required' }),
      contactNumber: z
        .string()
        .nonempty({ message: 'Contact number is required' }),
      emergencyContactNumber: z
        .string()
        .nonempty({ message: 'Emergency contact number is required' }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({
          message:
            "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
        }),
      }),
      permanentAddress: z
        .string()
        .nonempty({ message: 'Permanent address is required' }),
      presentAddress: z
        .string()
        .nonempty({ message: 'Present address is required' }),
      profileImage: z.string().optional(),
    }),
  }),
});

// Zod schemas for embedded documents with optional properties for update
const updateUserNameValidationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .max(20, { message: 'First name cannot be more than 20 characters' })
      .optional(),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
  })
  .partial();

// Main Admin schema with optional properties
export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z
      .object({
        name: updateUserNameValidationSchema.optional(),
        designation: z.string().min(1, 'Designation is required').optional(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z
          .string()
          .email({ message: 'Invalid email address' })
          .optional(),
        contactNumber: z.string().optional(),
        emergencyContactNumber: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        permanentAddress: z.string().optional(),
        presentAddress: z.string().optional(),
        profileImage: z.string().optional(),
      })
      .partial()
      .optional(),
  }),
});

export const AdminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
