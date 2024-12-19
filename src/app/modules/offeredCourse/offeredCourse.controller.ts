import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";


const createOfferedCourse = catchAsync(async (req, res) => {
    // will call the service function to send this data
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(
        req.body,
    );

    // send response using utils
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Offered Course created successfully',
        data: result,
    });
});

export const OfferedCourseControllers = {
    createOfferedCourse,
};
