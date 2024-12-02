
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

const getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
}

const updateSingleAcademicSemesterIntoDB = async (id: string, data: Partial<TAcademicSemester>) => {
    if (data.name && data.code && academicSemesterNameCodeMapper[data.name] !== data.code) {
        throw new Error('Invalid semester code')
    }
    const result = await AcademicSemester.findByIdAndUpdate(id, data, { new: true });
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateSingleAcademicSemesterIntoDB
}