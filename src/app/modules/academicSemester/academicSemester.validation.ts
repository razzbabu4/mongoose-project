import { z } from 'zod';
import { AcademicSemesterConstant } from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterConstant.SemesterNames] as [
      string,
      ...string[],
    ]),
    year: z.string(),
    code: z.enum([...AcademicSemesterConstant.SemesterCodes] as [
      string,
      ...string[],
    ]),
    startMonth: z.enum([...AcademicSemesterConstant.Months] as [
      string,
      ...string[],
    ]),
    endMonth: z.enum([...AcademicSemesterConstant.Months] as [
      string,
      ...string[],
    ]),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterConstant.SemesterNames] as [
        string,
        ...string[],
      ])
      .optional(),
    year: z.string().optional(),
    code: z
      .enum([...AcademicSemesterConstant.SemesterCodes] as [
        string,
        ...string[],
      ])
      .optional(),
    startMonth: z
      .enum([...AcademicSemesterConstant.Months] as [string, ...string[]])
      .optional(),
    endMonth: z
      .enum([...AcademicSemesterConstant.Months] as [string, ...string[]])
      .optional(),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
