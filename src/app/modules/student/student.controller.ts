import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = req.body

        // will call the service function to send this data
        const result = await StudentServices.createStudentIntoDB(student)

        // send response
        res.status(200).json({
            success: true,
            message: "Student is create successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

export const StudentController = {
    createStudent
}