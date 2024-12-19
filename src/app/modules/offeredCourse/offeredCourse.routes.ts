import { Router } from "express";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import validateRequest from "../middlewares/validateRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";

const router = Router();

router.post('/create-offered-course', validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema), OfferedCourseControllers.createOfferedCourse);

export const OfferedCourseRoute = router;