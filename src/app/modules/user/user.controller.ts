import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // will call the service function to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  // send response using utils
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  // will call the service function to send this data
  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  // send response using utils
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  // will call the service function to send this data
  const result = await UserServices.createAdminIntoDB(password, adminData);

  // send response using utils
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
