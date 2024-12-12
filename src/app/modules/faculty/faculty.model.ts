import { model, Schema, UpdateQuery } from 'mongoose';
import { TFaculty, TFacultyUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TAdmin } from '../admin/admin.interface';

const userNameSchema = new Schema<TFacultyUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, unique: true, required: [true, 'Id is required'] },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, 'Faculty User id is required'],
      ref: 'User',
    },
    name: { type: userNameSchema, required: true },
    designation: { type: String, required: true },
    gender: {
      type: String,
      enum: {
        values: Gender,
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
        values: BloodGroup,
        message:
          "{VALUE} is not valid. The bloodGroup field can only be the one of the following: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
      },
    },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    profileImage: { type: String },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Faculty id is required'],
      ref: 'AcademicFaculty',
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
facultySchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query middleware => check before deleting
facultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const update = this.getUpdate() as UpdateQuery<TAdmin>;

  if (query.id) {
    await Faculty.findOne(query).exec();
  }

  if (update.isDeleted === true) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This faculty has been marked as deleted and cannot be deleted.',
    );
  }

  next();
});

// Query middleware ==> find
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});

// Query middleware ==> findOne
facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});

// Query middleware => aggregate
// this.pipeline() => [ { '$match': { id: '123456' } } ]
facultySchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

// creating a custom static method
facultySchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model('Faculty', facultySchema);
