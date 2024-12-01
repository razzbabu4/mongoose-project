import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { StudentRoute } from "../modules/student/student.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoute
    },
    {
        path: '/students',
        route: StudentRoute
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;