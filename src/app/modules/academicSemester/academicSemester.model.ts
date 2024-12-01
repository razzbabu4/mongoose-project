import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterConstant } from './academicSemester.constant';


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: { type: String, required: true, enum: AcademicSemesterConstant.SemesterNames },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: AcademicSemesterConstant.SemesterCodes },
    startMonth: {
        type: String, enum: AcademicSemesterConstant.Months, required: true
    },
    endMonth: {
        type: String, enum: AcademicSemesterConstant.Months, required: true
    },
}, {
    timestamps: true
}
)

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)