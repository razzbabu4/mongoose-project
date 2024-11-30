
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Retrieve students data successfully',
    data: result
  })
})

const getSingleStudent = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single student retrieve successfully',
    data: result
  })
})

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteSingleStudentFromDB(studentId);

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single student updated successfully',
    data: result
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
