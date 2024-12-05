import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
router.get('/:studentId', StudentController.getSingleStudent);
router.patch('/:studentId', StudentController.updateSingleStudent);
router.delete('/:studentId', StudentController.deleteSingleStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoute = router;
