import Joi from 'joi';

export const userNameJoiSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .max(20)
        .required()
        .regex(/^[A-Z][a-z]*$/)
        .messages({
            'string.base': 'First Name must be a string',
            'string.empty': 'First Name is required',
            'string.max': 'First name cannot be more than 20 characters',
            'string.pattern.base': '{#value} should be in capitalized form',
        }),
    middleName: Joi.string().trim().allow(null, ''),
    lastName: Joi.string()
        .trim()
        .required()
        .regex(/^[A-Za-z]+$/)
        .messages({
            'string.base': 'Last Name must be a string',
            'string.empty': 'Last Name is required',
            'string.pattern.base': '{#value} is not alphabetic',
        }),
});

export const guardianJoiSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    motherOccupation: Joi.string().trim().required(),
    motherContactNo: Joi.string().trim().required(),
});

export const localGuardianJoiSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
});

export const studentJoiSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'ID must be a string',
        'string.empty': 'ID is required',
    }),
    name: userNameJoiSchema.required(),
    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
            'any.only': "The gender field can only be 'male', 'female', or 'other'",
        }),
    dateOfBirth: Joi.date().iso(),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': '{#value} is not a valid email address',
        }),
    contactNumber: Joi.string().trim().required(),
    emergencyContactNumber: Joi.string().trim().required(),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required()
        .messages({
            'any.only':
                "The bloodGroup field can only be 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
        }),
    permanentAddress: Joi.string().trim().required(),
    presentAddress: Joi.string().trim().required(),
    guardian: guardianJoiSchema.required(),
    localGuardian: localGuardianJoiSchema.required(),
    profileImage: Joi.string().uri().allow(null, ''),
    isActive: Joi.string()
        .valid('active', 'inactive')
        .default('active')
        .messages({
            'any.only': "The isActive field can only be 'active' or 'inactive'",
        }),
});

export default studentJoiSchema;