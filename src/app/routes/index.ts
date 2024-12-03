import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { StudentRoute } from "../modules/student/student.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartmnet/academicDepartment.routes";

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
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    },

]

moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;