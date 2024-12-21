import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
    const { id } = payload;
    // checking if the user exist
    const isUserExist = await User.findOne({ id })
    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "This user is not exist")
    }

    // checking if user is deleted
    const isUserDeleted = isUserExist?.isDeleted;
    if (isUserDeleted) {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is mark as deleted")
    }

    // checking if user is blocked
    const isUserBlocked = isUserExist?.status === "blocked";
    if (isUserBlocked) {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked")
    }

    // checking if password is matched
    const isPasswordMatch = await bcrypt.compare(payload?.password, isUserExist.password)


    return {}
}

export const AuthServices = {
    loginUser
}