import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../middlewares/validateRequest';
import { FacultyValidationSchema } from './faculty.validation';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);
router.delete('/:id', FacultyControllers.deleteSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidationSchema.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);
router.get('/', auth(), FacultyControllers.getAllFaculty);

export const FacultyRoute = router;
