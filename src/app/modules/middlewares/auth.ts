import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TUserRole } from '../user/user.interface';
import { User } from '../user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token send from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !!');
    }

    // check if the token is valid
    const decoded = jwt.verify(token, config.jwtAccessSecret as string) as JwtPayload;

    const { role, userId, iat } = decoded;

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

    // check user role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !!');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
