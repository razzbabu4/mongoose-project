import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistrations.interface';
import { SemesterRegistrationsStatus } from './semesterRegistrations.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistrationsStatus,
      default: 'UPCOMING',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCredit: { type: Number, default: 3 },
    maxCredit: { type: Number, default: 15 },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistrations = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
