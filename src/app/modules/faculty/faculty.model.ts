import { model, Schema } from 'mongoose';
import { TFaculty, TFacultyUserName } from './faculty.interface';

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

const facultySchema = new Schema<TFaculty>({
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
      values: ['male', 'female', 'other'],
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
});

export const Faculty = model('Faculty', facultySchema);
