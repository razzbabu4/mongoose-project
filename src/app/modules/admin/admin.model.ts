import { Schema, UpdateQuery, model } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { TAdmin, TAdminUserName } from './admin.interface';
import AppError from '../../errors/AppError';
import { BloodGroup, Gender } from './admin.constant';

const userNameSchema = new Schema<TAdminUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true, // remove space from front and end
    maxlength: [20, 'First name can not be more than 20 character'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});

// create schema for Admin
const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, unique: true, required: [true, 'Id is required'] },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    name: { type: userNameSchema, required: true },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
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
      required: true,
    },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    profileImage: { type: String },
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
adminSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query middleware => check before deleting
adminSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const update = this.getUpdate() as UpdateQuery<TAdmin>;

  if (query.id) {
    await Admin.findOne(query).exec();
  }

  if (update.isDeleted === true) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This admin has been marked as deleted and cannot be deleted.',
    );
  }

  next();
});

// Query middleware ==> find
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});

// Query middleware ==> findOne
adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});

// Query middleware => aggregate
// this.pipeline() => [ { '$match': { id: '123456' } } ]
adminSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

// creating a custom static method
adminSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

// create model for student
export const Admin = model<TAdmin>('Admin', adminSchema);
