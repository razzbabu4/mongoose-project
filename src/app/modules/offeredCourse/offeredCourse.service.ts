import { StatusCodes } from "http-status-codes";
import { TOfferedCourse } from "./offeredCourse.interface";
import AppError from "../../errors/AppError";
import { offeredCourse } from "./offeredCourse.model";
import { SemesterRegistrations } from "../semesterRegistration/semesterRegistrations.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../courses/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import { RegistrationsStatus } from "../semesterRegistration/semesterRegistrations.constant";


const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        section,
        faculty,
        days,
        startTime,
        endTime,
    } = payload;

    /**
     * Step 1: check if the semester registration id is exists!
     * Step 2: check if the academic faculty id is exists!
     * Step 3: check if the academic department id is exists!
     * Step 4: check if the course id is exists!
     * Step 5: check if the faculty id is exists!
     * Step 6: check if the department is belong to the  faculty
     * Step 7: check if the same offered course same section in same registered semester exists
     * Step 8: get the schedules of the faculties
     * Step 9: check if the faculty is available at that time. If not then throw error
     * Step 10: create the offered course
     */

    //check if the semester registration id is exists!
    const isSemesterRegistrationExists = await SemesterRegistrations.findById(semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Semester registration not found !',
        );
    }

    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);

    if (!isAcademicFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Faculty not found !');
    }

    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);

    if (!isAcademicDepartmentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Academic Department not found !');
    }

    const isCourseExists = await Course.findById(course);

    if (!isCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Course not found !');
    }

    const isFacultyExists = await Faculty.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found !');
    }

    // check if the department is belong to the  faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty,
    });

    if (!isDepartmentBelongToFaculty) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `This ${isAcademicDepartmentExists.name} is not  belong to this ${isAcademicFacultyExists.name}`,
        );
    }

    // check if the same offered course same section in same registered semester exists

    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
        await offeredCourse.findOne({
            semesterRegistration,
            course,
            section,
        });

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `Offered course with same section is already exist!`,
        );
    }

    // get the schedules of the faculties
    const assignedSchedules = await offeredCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime,
    };

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            StatusCodes.CONFLICT,
            `This faculty is not available at that time ! Choose other time or day`,
        );
    }

    const result = await offeredCourse.create({
        ...payload,
        academicSemester,
    });
    return result;
};

const getAllOfferedCoursesFromDB = async () => {
    const result = await offeredCourse.find();
    return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
    const result = await offeredCourse.findById(id);
    return result;
};

const updateSingleOfferedCourseIntoDB = async (
    id: string,
    payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">,
) => {
    const { faculty, days, startTime, endTime } = payload;

    const isFacultyExists = await Faculty.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found !');
    }

    const isOfferedCourseExists = await offeredCourse.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Offered Course not found !');
    }

    const semesterRegistration = isOfferedCourseExists.semesterRegistration;

    const semesterRegistrationStatus = await SemesterRegistrations.findById(semesterRegistration);

    if (semesterRegistrationStatus?.status !== RegistrationsStatus.UPCOMING) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
        );
    }

    // get the schedules of the faculties
    const assignedSchedules = await offeredCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime,
    };

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            StatusCodes.CONFLICT,
            `This faculty is not available at that time ! Choose other time or day`,
        );
    }

    const result = await offeredCourse.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateSingleOfferedCourseIntoDB,
};
