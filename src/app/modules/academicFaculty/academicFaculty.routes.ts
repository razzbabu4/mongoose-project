import express from 'express'
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicValidation';

const router = express.Router();

router.post('/create-academic-faculty', validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.patch('/:facultyId', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateSingleAcademicFaculty);

export const AcademicFacultyRoutes = router;