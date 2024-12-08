import mongoose from 'mongoose';
import { TErrorSources, TGenericsErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericsErrorResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

export default handleCastError;
