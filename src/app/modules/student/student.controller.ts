import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // will call the service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is create successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error
    })
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Retrive student data successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student retrieve successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
