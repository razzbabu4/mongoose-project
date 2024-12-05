import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterConstant } from './academicSemester.constant';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.SemesterNames,
    },
    year: { type: String, required: true },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.SemesterCodes,
    },
    startMonth: {
      type: String,
      enum: AcademicSemesterConstant.Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: AcademicSemesterConstant.Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new AppError(StatusCodes.CONFLICT, 'Semester is already exist');
  }
  next();
});

academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isFacultyExist = await AcademicSemester.findById(query);

  if (!isFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Semester does not exist');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
