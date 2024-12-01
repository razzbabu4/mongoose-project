import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths, TSemesterCodes, TSemesterNames } from './academicSemester.interface';

const Months: TMonths[] = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
];

const SemesterNames: TSemesterNames[] = ['Autumn', 'Summer', 'Fall'];
const SemesterCodes: TSemesterCodes[] = ['01', '02', '03'];

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: { type: String, required: true, enum: SemesterNames },
    year: { type: Date, required: true },
    code: { type: String, required: true, enum: SemesterCodes },
    startMonth: {
        type: String, enum: Months, required: true
    },
    endMonth: {
        type: String, enum: Months, required: true
    },
}, {
    timestamps: true
}
)

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)