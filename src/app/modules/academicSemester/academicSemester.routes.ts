import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)

export const AcademicSemesterRoutes = router;