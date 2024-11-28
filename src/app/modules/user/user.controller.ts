import { NextFunction, Request, Response } from "express"
import { UserServices } from "./user.service";


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;

        // will call the service function to send this data
        const result = await UserServices.createStudentIntoDB(password, studentData);

        // send response
        res.status(200).json({
            success: true,
            message: 'Student is create successfully',
            data: result,
        });
    } catch (error) {
        next(error)
    }
};

export const UserController = {
    createStudent
}