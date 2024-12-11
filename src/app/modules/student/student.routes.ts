import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

// will call controller function
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentValidationSchema),
  StudentController.updateSingleStudent,
);
router.delete('/:id', StudentController.deleteSingleStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoute = router;
