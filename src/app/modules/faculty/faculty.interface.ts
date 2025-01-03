import { Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TFacultyUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TFacultyUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
