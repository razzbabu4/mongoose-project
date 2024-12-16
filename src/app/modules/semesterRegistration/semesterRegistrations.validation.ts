import { z } from "zod";
import { SemesterRegistrationsStatus } from "./semesterRegistrations.constant";

const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...(SemesterRegistrationsStatus as [string, ...string[]])]),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number(),
        maxCredit: z.number()
    })
})

export const SemesterRegistrationValidations = {
    createSemesterRegistrationValidationSchema
}