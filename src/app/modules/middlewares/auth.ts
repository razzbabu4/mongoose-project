import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from "jsonwebtoken";
import config from '../../config';

const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        // check if the token send from the client
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !!');
        }

        // check if the token is valid
        jwt.verify(token, config.jwtSecret as string, function (err, decoded) {
            // err
            if (err) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !!');
            }

            req.user = decoded as JwtPayload
        });
        next();
    });
};

export default auth;
