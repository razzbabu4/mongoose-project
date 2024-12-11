import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Retrieve students data successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single student retrieve successfully',
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateSingleStudentIntoDB(
    id,
    student,
  );

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single student updated successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(id);

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
