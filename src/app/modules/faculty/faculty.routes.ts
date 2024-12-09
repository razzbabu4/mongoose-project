import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../middlewares/validateRequest';
import { FacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/:facultyId', FacultyControllers.getSingleFaculty);
router.delete('/:facultyId', FacultyControllers.deleteSingleFaculty);
router.patch(
  '/:facultyId',
  validateRequest(FacultyValidationSchema.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);
router.get('/', FacultyControllers.getAllFaculty);

export const FacultyRoute = router;
