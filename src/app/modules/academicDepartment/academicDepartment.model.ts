import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, unique: true, required: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" }
}, {
    timestamps: true
})


// check department existence in creation time
academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name
    })

    if (isDepartmentExist) {
        throw new AppError(StatusCodes.CONFLICT, 'This Department is already exist')
    }
    next();
});

// check department existence in updating time
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartment.findById(query);

    if (!isDepartmentExist) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This department does not exist')
    }
    next();
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)