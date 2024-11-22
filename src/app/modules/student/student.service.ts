import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(student); // built-in static method

  // creating instance
  const student = new Student(studentData); // create an instance

  if (await student.isUserExist(studentData.id)) {
    throw new Error('Student is already exist'); // custom instance
  }

  const result = await student.save(); // built-in instance method
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
