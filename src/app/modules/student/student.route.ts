import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', StudentController.createStudent);
router.get('/:studentId', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoute = router;
