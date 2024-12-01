import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';

const router = express.Router();

router.post('/create-academicSemester', validateRequest(createStudentValidationSchema), AcademicSemesterController.createAcademicSemester)

export const AcademicSemesterRoutes = router;