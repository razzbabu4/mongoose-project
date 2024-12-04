import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

// check faculty existence in creation time
academicFacultySchema.pre('save', async function (next) {
    const isFacultyExist = await AcademicFaculty.findOne({
        name: this.name
    })

    if (isFacultyExist) {
        throw new Error('This Faculty is already exist')
    }
    next();
});

// check faculty existence in updating time
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isFacultyExist = await AcademicFaculty.findById(query);

    if (!isFacultyExist) {
        throw new Error('This Faculty does not exist')
    }
    next();
})

export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema)