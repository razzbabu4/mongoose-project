import { Router } from 'express';
import { UserRoute } from '../modules/user/user.routes';
import { StudentRoute } from '../modules/student/student.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { FacultyRoute } from '../modules/faculty/faculty.routes';
import { AdminRoute } from '../modules/admin/admin.routes';
import { CourseRoute } from '../modules/courses/course.routes';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistrations.routes';
import { OfferedCourseRoute } from '../modules/offeredCourse/offeredCourse.routes';
import { AuthRouter } from '../modules/auth/auth.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoute,
  },
  {
    path: '/courses',
    route: CourseRoute,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
