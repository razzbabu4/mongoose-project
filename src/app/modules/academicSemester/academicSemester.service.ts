import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (academicSemester: TAcademicSemester) => {


    // academicSemesterNameCodeMapper[academicSemester.name] = 01 | 02 | 03
    if (academicSemesterNameCodeMapper[academicSemester.name] !== academicSemester.code) {
        throw new Error('Mismatch with semester and code')
    }

    const newSemester = await AcademicSemester.create(academicSemester);
    return newSemester;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}