import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user exist
  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exist');
  }

  // checking if user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is mark as deleted');
  }

  // checking if user is blocked
  const userStatus = user.status === 'blocked';
  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
  }

  // checking if password is matched
  const isPasswordMatch = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }

  // create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken =
    createToken(
      jwtPayload,
      config.jwtAccessSecret as string,
      config.jwtAccessExpire as string
    )


  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    config.jwtRefreshExpire as string
  )

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user?.needPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user exist
  const user = await User.isUserExistsByCustomId(userData.userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exist');
  }

  // checking if user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is mark as deleted');
  }

  // checking if user is blocked
  const userStatus = user.status === 'blocked';
  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
  }

  // checking if password is matched
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }

  // hash new password
  const newHashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.saltRound),
  );

  await User.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: newHashPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = jwt.verify(token, config.jwtRefreshSecret as string) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user exist
  const user = await User.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exist');
  }

  // checking if user is deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is mark as deleted');
  }

  // checking if user is blocked
  const userStatus = user.status === 'blocked';
  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
  }

  // token verify after password change
  if (
    user.passwordChangedAt &&
    User.isJwtIssuedBeforePasswordChange(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !!');
  }

  // create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken =
    createToken(
      jwtPayload,
      config.jwtAccessSecret as string,
      config.jwtAccessExpire as string
    )

  return {
    accessToken
  }

}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken
};
