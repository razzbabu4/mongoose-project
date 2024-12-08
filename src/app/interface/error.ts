export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericsErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
