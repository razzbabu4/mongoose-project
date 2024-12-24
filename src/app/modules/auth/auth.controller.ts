import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken, needPasswordChange } = result;
  // save in cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true
  })
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Login successful',
    data: {
      accessToken,
      needPasswordChange
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  // console.log(req.user, req.body)
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Changes password successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Access token is retrieve successfully',
    data: result
  });
})

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken
};
