import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { SemesterRegistrationsServices } from "./semesterRegistrations.service";
import sendResponse from "../../utils/sendResponse";


const createSemesterRegistration = catchAsync(async (req, res) => {
    // will call the service function to send this data
    const result = await SemesterRegistrationsServices.createSemesterRegistrationsIntoDB(
        req.body,
    );

    // send response using utils
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Semester Registration is created successfully',
        data: result,
    });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationsServices.getAllSemesterRegistrationsFromDB(req?.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Retrieve all Registration Semester successfully',
        data: result,
    });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
        await SemesterRegistrationsServices.getSingleSemesterRegistrationsFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Retrieve single registration semester successfully',
        data: result,
    });
});

const updateSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result =
        await SemesterRegistrationsServices.updateSingleSemesterRegistrationsIntoDB(
            id, payload
        );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Update single  Registration successfully',
        data: result,
    });
});

export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSingleSemesterRegistration,
};
