import { z } from "zod";
import { AcademicSemesterConstant } from "./academicSemester.constant";

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterConstant.SemesterNames] as [string, ...string[]]),
        year: z.date(),
        code: z.enum([...AcademicSemesterConstant.SemesterCodes] as [string, ...string[]]),
        startMonth: z.enum([...AcademicSemesterConstant.Months] as [string, ...string[]]),
        endMonth: z.enum([...AcademicSemesterConstant.Months] as [string, ...string[]]),
    })
})

export const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema
}