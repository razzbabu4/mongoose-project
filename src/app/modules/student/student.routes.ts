import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
router.get('/:studentId', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.delete('/:studentId', StudentController.deleteSingleStudent);

export const StudentRoute = router;
