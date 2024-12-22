import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  // will call the service function to send this data
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course created successfully',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Courses retrieve successfully',
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(
    req.params.id,
  );

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course retrieve successfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  // will call the service function to send this data
  const result = await OfferedCourseServices.updateSingleOfferedCourseIntoDB(
    req.params.id,
    req.body,
  );

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course updated successfully',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  // will call the service function to send this data
  const result = await OfferedCourseServices.deleteOfferedCourseFromDB(
    req.params.id,
  );

  // send response using utils
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course deleted successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
