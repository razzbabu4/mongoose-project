import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, unique: true, required: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" }
}, {
    timestamps: true
})


export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)