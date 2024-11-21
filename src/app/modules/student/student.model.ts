import { Schema, model } from 'mongoose';
// import validator from 'validator';

import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true, // remove space from front and end
    maxlength: [20, "First name can not be more than 20 character"],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} should be in capitalized form"
    // }
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} is not alphabetic format"
    // }
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// create schema for student
const studentSchema = new Schema<Student>({
  id: { type: String, unique: true, required: [true, "Already exist"] },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      // message: "{VALUE} is not supported"
      message: "The gender field can only be the one of the following: 'male', 'female', or 'other'"
    },
    required: true
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email should be unique'],
    // validate: {
    //   validator: (value) => validator.isEmail(value),
    //   message: "{VALUE} is not an email"
    // }
  },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: "{VALUE} is not valid. The bloodGroup field can only be the one of the following: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'"
    },
    required: true
  },
  permanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: "{VALUE} is not valid. Use 'active' or 'inactive'"
    },
    required: true,
    default: 'active'
  },
});

// create model for student
export const StudentModel = model<Student>('Student', studentSchema);
