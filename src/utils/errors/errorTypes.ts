type HttpCode = number;

interface CommonErrorName {
  ok: string;
  badRequest: string;
  notFound: string;
  internalServerError: string;
}

interface CommonHttpError {
  ok: HttpCode;
  badRequest: HttpCode;
  notFound: HttpCode;
  internalServerError: HttpCode;
}

const commonErrorNames: CommonErrorName = {
  ok: "ok",
  badRequest: "Bad request",
  notFound: "Not Found",
  internalServerError: "Internal server error",
};

const commonHttpErrors: CommonHttpError = {
  ok: 200,
  badRequest: 400,
  notFound: 404,
  internalServerError: 500,
};

export {
  type HttpCode,
  type CommonErrorName,
  type CommonHttpError,
  commonErrorNames,
  commonHttpErrors,
};
