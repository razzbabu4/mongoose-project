import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../middlewares/validateRequest';
import { FacultyValidationSchema } from '../faculty/faculty.validation';
import { StudentValidation } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidationSchema.createFacultyValidationSchema),
  UserController.createFaculty,
);

export const UserRoute = router;
