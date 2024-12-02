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

const getAllAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Retrieve all academic semester successfully",
        data: result
    })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Retrieve single academic semester successfully",
        data: result
    })
})

const updateSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const payload = req.body;
    const result = await AcademicSemesterServices.updateSingleAcademicSemesterIntoDB(semesterId, payload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Update single academic semester successfully",
        data: result
    })
})

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateSingleAcademicSemester
}