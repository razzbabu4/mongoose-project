import { z } from 'zod';

// Zod schema for TFacultyUserName
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .nonempty({ message: 'First Name is required' }),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty({ message: 'Last Name is required' }),
});

// Zod schema for Faculty
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .max(20, { message: 'Password cannot be more than 20 characters' }),
    faculty: z.object({
      name: createUserNameValidationSchema,
      designation: z.string().min(1, 'Designation is required'),
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message:
            "The gender field can only be one of the following: 'male', 'female', or 'other'",
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
      contactNumber: z.string().min(1, 'Contact Number is required'),
      emergencyContactNumber: z
        .string()
        .min(1, 'Emergency Contact Number is required'),
      permanentAddress: z.string().min(1, 'Permanent Address is required'),
      presentAddress: z.string().min(1, 'Present Address is required'),
      profileImage: z.string().optional(),
      academicFaculty: z.string().min(1, 'Academic Faculty id is required'), // Assuming ObjectId is passed as a string
      academicDepartment: z.string().min(1, 'Department id is required'), // Assuming ObjectId is passed as a string
      isDeleted: z.boolean().optional(),
    }),
  }),
});

// Updated Zod schema for TFacultyUserName
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .optional(), // Made optional
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .max(20, { message: 'Last name cannot be more than 20 characters' })
    .optional(), // Made optional
});

// Zod schema for updating Faculty
const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z
      .object({
        name: updateUserNameValidationSchema.optional(), // Made optional
        designation: z.string().optional(), // Made optional
        gender: z
          .enum(['male', 'female', 'other'], {
            errorMap: () => ({
              message:
                "The gender field can only be one of the following: 'male', 'female', or 'other'",
            }),
          })
          .optional(), // Made optional
        dateOfBirth: z.string().optional(),
        email: z.string().email('Invalid email address').optional(), // Made optional
        contactNumber: z.string().optional(), // Made optional
        emergencyContactNumber: z.string().optional(), // Made optional
        permanentAddress: z.string().optional(), // Made optional
        presentAddress: z.string().optional(), // Made optional
        profileImage: z.string().optional(),
        academicFaculty: z.string().optional(), // Made optional
        academicDepartment: z.string().optional(), // Made optional
        isDeleted: z.boolean().optional(),
      })
      .optional(), // Made optional
  }),
});

// Export the Zod schema
export const FacultyValidationSchema = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
