// import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';

// const createStudentIntoDB = async (studentData: TStudent): Promise<TStudent> => {
//   // custom static method
//   if (await Student.isUserExist(studentData.id)) {
//     throw new Error('User is already exist');
//   }

//   const result = await Student.create(studentData); // built-in static method

//   // creating instance
//   // const student = new Student(studentData); // create an instance

//   // if (await student.isUserExist(studentData.id)) {
//   //   throw new Error('Student is already exist'); // custom instance
//   // }
//   // const result = await student.save(); // built-in instance method

//   return result;
// };

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // const result = await Student.aggregate([
  //   { $match: { id: id } }
  // ])
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete student --> toggle the isDeleted to true
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(StatusCodes.NOT_MODIFIED, 'Failed to delete student');
    }

    // delete user --> toggle the isDeleted to true
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(StatusCodes.NOT_MODIFIED, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return { deletedStudent, deletedUser };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
