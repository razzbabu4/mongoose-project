import express from 'express'
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', StudentController.createStudent);


export const StudentRoute = router;