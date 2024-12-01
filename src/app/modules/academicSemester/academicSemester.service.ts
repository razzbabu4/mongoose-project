import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (academicSemester: TAcademicSemester) => {
    const newSemester = await AcademicSemester.create(academicSemester);
    return newSemester;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}