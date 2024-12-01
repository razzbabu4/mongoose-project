import { z } from "zod";
const Months = z.enum([
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
]);

const SemesterNames = z.enum(['Autumn', 'Summer', 'Fall']);

const SemesterCodes = z.enum(['01', '02', '03']);

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: SemesterNames,
        year: z.string().regex(/^\d{4}$/), // Year as a 4-digit string
        code: SemesterCodes,
        startMonth: Months,
        endMonth: Months,
    })
})

export const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema
}