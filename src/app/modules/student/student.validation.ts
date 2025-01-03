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

const createGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .nonempty({ message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's contact number is required" }),
  motherName: z
    .string()
    .trim()
    .nonempty({ message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .nonempty({ message: "Mother's contact number is required" }),
});

const createLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Local guardian's name is required" }),
  occupation: z.string().nonempty({ message: 'Occupation is required' }),
  contactNo: z.string().nonempty({ message: 'Contact number is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
});

// Main student schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .max(20, { message: 'Password cannot be more than 20 characters' }),
    student: z.object({
      name: createUserNameValidationSchema,
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
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
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

const updateGuardianValidationSchema = z
  .object({
    fatherName: z.string().trim().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().trim().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
  })
  .partial();

const updateLocalGuardianValidationSchema = z
  .object({
    name: z.string().trim().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
  })
  .partial();

// Main student schema with optional properties
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema.optional(),
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
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        profileImage: z.string().optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .partial()
      .optional(),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
