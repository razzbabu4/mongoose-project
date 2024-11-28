import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Retrieve student data successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student retrieve successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student updated successfully',
      data: result,
    });

  } catch (error) {
    next(error)
  }
}

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
