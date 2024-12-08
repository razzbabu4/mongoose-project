import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericsErrorResponse } from '../interface/error';

// zod error handler
const handleZodError = (err: ZodError): TGenericsErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleZodError;
