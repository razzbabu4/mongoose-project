import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistrations.interface";
import { SemesterRegistrations } from "./semesterRegistrations.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationsStatus } from "./semesterRegistrations.constant";

const createSemesterRegistrationsIntoDB = async (payload: TSemesterRegistration) => {
    // check ,if the semester exist
    const academicSemester = payload?.academicSemester;

    // check if there any registered semester is "ONGOING" / "UPCOMING"
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistrations.findOne({
        $or: [
            { status: RegistrationsStatus.UPCOMING },
            { status: RegistrationsStatus.ONGOING },
        ]
    });

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(StatusCodes.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} semester registered !`)
    }

    // check if the semester is exist
    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)
    if (!isAcademicSemesterExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "The academic Semester is not found")
    }

    // check if the semester is registered
    const isSemesterRegistered = await SemesterRegistrations.findOne({ academicSemester });
    if (isSemesterRegistered) {
        throw new AppError(StatusCodes.CONFLICT, "The Semester is already registered")
    }

    const result = await SemesterRegistrations.create(payload);
    return result;

};

const getAllSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(
        SemesterRegistrations.find().populate('academicSemester'),
        query
    )
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await semesterRegistrationQuery.modelQuery;
    return result;

};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
    const result = await SemesterRegistrations.findById(id);
    return result;
};

const updateSingleSemesterRegistrationsIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
    // check if semester registration exist
    const isSemesterRegistrationExist = await SemesterRegistrations.findById(id);
    if (!isSemesterRegistrationExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "This semester is not found")
    }

    // if the requested semester is registration ended, we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExist?.status;
    const requestedSemesterStatus = payload?.status;
    if (currentSemesterStatus === RegistrationsStatus.ENDED) {
        throw new AppError(StatusCodes.BAD_REQUEST, `The semester is already ${currentSemesterStatus}!`)
    };

    // UPCOMING --> ONGOING --> ENDED
    if (currentSemesterStatus === RegistrationsStatus.UPCOMING && requestedSemesterStatus === RegistrationsStatus.ENDED) {
        throw new AppError(StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`)
    }

    if (currentSemesterStatus === RegistrationsStatus.ONGOING && requestedSemesterStatus === RegistrationsStatus.UPCOMING) {
        throw new AppError(StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`)
    }

    const result = await SemesterRegistrations.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
};

export const SemesterRegistrationsServices = {
    createSemesterRegistrationsIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationsFromDB,
    updateSingleSemesterRegistrationsIntoDB,
};