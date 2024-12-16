import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistrations.interface";
import { SemesterRegistrations } from "./semesterRegistrations.model";

const createSemesterRegistrationsIntoDB = async (payload: TSemesterRegistration) => {
    // check ,if the semester exist
    const academicSemester = payload?.academicSemester;

    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)
    if (!isAcademicSemesterExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "The academic Semester is not found")
    }

    const isSemesterRegistered = await SemesterRegistrations.findOne({ academicSemester });
    if (isSemesterRegistered) {
        throw new AppError(StatusCodes.CONFLICT, "The Semester is already registered")
    }

    const result = await SemesterRegistrations.create(payload);
    return result;

};

const getAllSemesterRegistrationsFromDB = async () => {

};

const getSingleSemesterRegistrationsFromDB = async () => {

};

const updateSingleSemesterRegistrationsIntoDB = async (

) => {

};

export const SemesterRegistrationsServices = {
    createSemesterRegistrationsIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationsFromDB,
    updateSingleSemesterRegistrationsIntoDB,
};