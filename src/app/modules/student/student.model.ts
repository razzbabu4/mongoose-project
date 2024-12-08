import { Schema, model } from 'mongoose';
// import validator from 'validator';

import {
  TStudent,
  TGuardian,
  TLocalGuardian,
  TUserName,
  // StudentMethod,  // for creating instance
  // StudentModel,
} from './student.interface';
import AppError from '../../errors/AppError';
import { UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true, // remove space from front and end
    maxlength: [20, 'First name can not be more than 20 character'],
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
    required: [true, 'Last Name is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} is not alphabetic format"
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// create schema for student
const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, unique: true, required: [true, 'Id is required'] },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        // message: "{VALUE} is not supported"
        message:
          "The gender field can only be the one of the following: 'male', 'female', or 'other'",
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email should be unique'],
    },
    contactNumber: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          "{VALUE} is not valid. The bloodGroup field can only be the one of the following: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
      },
      required: true,
    },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Semester id is required'],
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Department id is required'],
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// // virtual in mongoose
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query middleware => check before deleting
studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const update = this.getUpdate() as UpdateQuery<TStudent>;

  if (query.id) {
    await Student.findOne(query).exec();
  }

  if (update.isDeleted === true) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This student has been marked as deleted and cannot be deleted.',
    );
  }

  next();
});

// Query middleware ==> find
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});

// Query middleware ==> findOne
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});

// Query middleware => aggregate
// this.pipeline() => [ { '$match': { id: '123456' } } ]
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

// creating a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// create model for student
export const Student = model<TStudent>('Student', studentSchema);
