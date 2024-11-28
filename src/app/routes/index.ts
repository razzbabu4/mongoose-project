import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { StudentRoute } from "../modules/student/student.routes";

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;