import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {

    // will call the service function to send this data
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

    // send response using utils
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Semester is created successfully',
        data: result
    })

});

export const AcademicSemesterController = {
    createAcademicSemester
}