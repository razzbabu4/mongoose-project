import { Router } from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../middlewares/validateRequest';
import { CourseValidations } from './course.validation';

const router = Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateSingleCourse,
);
router.get('/:id', CourseControllers.getSingleCourse);
router.delete('/:id', CourseControllers.deleteSingleCourse);
router.get('/', CourseControllers.getAllCourses);

export const CourseRoute = router;
