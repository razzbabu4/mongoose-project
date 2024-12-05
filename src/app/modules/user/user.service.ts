import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info for generate id
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set generated id
  if (admissionSemester) {
    userData.id = await generatedStudentId(admissionSemester);
  }

  // create a session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id; // embedding
    payload.user = newUser[0]._id; // referencing

    // create a user (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
