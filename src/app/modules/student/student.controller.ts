import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    // send response using utils
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Retrieve student data successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // send response using utils
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single student retrieve successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
};

const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    // send response using utils
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single student updated successfully',
      data: result
    })

  } catch (error) {
    next(error)
  }
}

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
