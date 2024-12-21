import { Router } from "express";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import validateRequest from "../middlewares/validateRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";

const router = Router();

router.post('/create-offered-course', validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema), OfferedCourseControllers.createOfferedCourse);
router.patch('/:id', validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema), OfferedCourseControllers.updateOfferedCourse);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse)
router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse)
router.get('/', OfferedCourseControllers.getAllOfferedCourses)

export const OfferedCourseRoute = router;