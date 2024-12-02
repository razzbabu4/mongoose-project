import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLstStudentId = async () => {
    const lastStudent = await User.findOne({
        role: 'student'
    },
        {
            id: 1,
            _id: 0
        })
        .sort({
            createdAt: -1
        })
        .lean()
    // 203001 0001
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};


// year semesterCode 4 digit number
export const generatedStudentId = async (semesterData: TAcademicSemester) => {
    const currentId = await findLstStudentId() || (0).toString();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${semesterData.year}${semesterData.code}${incrementId}`;
    return incrementId

}

