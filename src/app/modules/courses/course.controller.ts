import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const updateSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateSingleCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});

const deleteSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const assignCourseWithFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignCourseWithFacultyIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculties assigned successfully',
    data: result,
  });
});

const removeCourseWithFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeCourseWithFacultyFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculties removed successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateSingleCourse,
  deleteSingleCourse,
  assignCourseWithFaculty,
  removeCourseWithFaculty,
};
