import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  // return lastStudent?.id ? lastStudent.id.substring(6) : undefined; // skip first 6 digit using substring
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year + semesterCode + 4 digit number -> 2030 01 0001
export const generatedStudentId = async (semesterData: TAcademicSemester) => {
  let currentId = (0).toString(); // by default

  const lastStudentId = await findLastStudentId();

  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); // 2030
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 01

  const currentSemesterYear = semesterData.year;
  const currentSemesterCode = semesterData.code;

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentSemesterYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${semesterData.year}${semesterData.code}${incrementId}`;
  return incrementId;
};

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  // return lastFaculty?.id ? lastFaculty.id.substring(6) : undefined; // skip first 6 digit using substring
  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();
  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};

const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  // return lastAdmin?.id ? lastAdmin.id.substring(6) : undefined; // skip first 6 digit using substring
  return lastAdmin?.id ? lastAdmin.id : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();
  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;
  return incrementId;
};
