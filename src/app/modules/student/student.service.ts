// import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { StudentSearchableFields } from './student.constant';

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

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // implement search with string
  // const queryObj = { ...query };
  // const StudentSearchableFields = [
  //   'email',
  //   'name.firstName',
  //   'name.lastName',
  //   'presentAddress',
  // ];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   // {'email' : {$regex : query.searchTerm, $options: 'i'}}
  //   $or: StudentSearchableFields.map((field) => {
  //     return {
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     };
  //   }),
  // });

  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((elem) => delete queryObj[elem]);
  // // console.log({ query, queryObj });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = query.limit as number;
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // // field limiting
  // let fields = '-__v'; // omit --v using minus(-)

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(StudentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
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

const updateSingleStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  // dynamically update primitive and non-primitive data
  const { name, guardian, localGuardian, ...restStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...restStudentData };

  // dynamically update non-primitive data name
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  // dynamically update non-primitive data guardian
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  // dynamically update non-primitive data localGuardian
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
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
  updateSingleStudentIntoDB,
  deleteSingleStudentFromDB,
};
