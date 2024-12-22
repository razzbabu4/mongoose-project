import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../middlewares/validateRequest';
import { FacultyValidationSchema } from '../faculty/faculty.validation';
import { StudentValidation } from '../student/student.validation';
import { AdminValidation } from '../admin/admin.validation';
import auth from '../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidationSchema.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoute = router;
