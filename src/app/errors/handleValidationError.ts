import mongoose from 'mongoose';
import { TErrorSources, TGenericsErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericsErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = Object.values(err.errors) // convert object into array
    .map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    });

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
