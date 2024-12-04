import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {

    // will call the service function to send this data
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    // send response using utils
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Academic Department created successfully",
        data: result
    })
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All Academic Departments retrieve successfully",
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Single Academic Department retrieve successfully",
        data: result
    })
})

const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const payload = req.body;
    const result = await AcademicDepartmentServices.updateSingleAcademicDepartmentIntoDB(departmentId, payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Update single Academic Department successfully",
        data: result
    })
})


export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment
}