import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
    // checking if the user exist
    const user = await User.isUserExistsByCustomId(payload.id)
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "This user is not exist")
    }

    // checking if user is deleted
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is mark as deleted")
    }

    // checking if user is blocked
    const userStatus = user.status === "blocked";
    if (userStatus) {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked")
    }

    // checking if password is matched
    const isPasswordMatch = await User.isPasswordMatched(payload.password, user.password)
    if (!isPasswordMatch) {
        throw new AppError(StatusCodes.FORBIDDEN, "Password do not matched")
    }


    return {}
}

export const AuthServices = {
    loginUser
}