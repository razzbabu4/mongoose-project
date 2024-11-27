import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
    id: { type: String, required: true },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean, required: true },
    role: { type: String, enum: { values: ["admin", "faculty", "student"] }, required: true },
    status: { type: String, enum: { values: ["in-progress", "blocked"] }, required: true },
    isDeleted: { type: Boolean, default: false }
},
    {
        timestamps: true
    }
)

export const User = model<TUser>("user", userSchema)