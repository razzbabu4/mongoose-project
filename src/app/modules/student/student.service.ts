import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // custom static method
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User is already exist');
  }

  const result = await Student.create(studentData); // built-in static method

  // creating instance
  // const student = new Student(studentData); // create an instance

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('Student is already exist'); // custom instance
  // }
  // const result = await student.save(); // built-in instance method

  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([
    { $match: { id: id } }
  ])
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB
};
