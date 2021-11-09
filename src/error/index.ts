export const errorResponse = {
  type: "object",
  additionalProperties: false,
  properties: {
    statusCode: { type: "number" },
    error: { type: "string" },
    message: { type: "string" },
  },
};

const errorMap = new Map<number, string>();
errorMap.set(400, "Bad Request");
errorMap.set(401, "Unauthorized");
errorMap.set(403, "Forbidden");
errorMap.set(404, "Not Found");
errorMap.set(409, "Conflict");
errorMap.set(500, "Server error");
errorMap.set(503, "Service Unavailable");

export interface IErrorObject {
  statusCode: number;
  error: string;
  message: string;
}

export class AppError extends Error {
  statusCode: number;
  error: string;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.error = errorMap.get(statusCode) || "Server error";
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }

  toObject(): IErrorObject {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
    };
  }
}

export enum DBErrorType {
  badInput = 400,
  notFound = 404,
  conflict = 409,
}

export class DBError extends Error {
  type: DBErrorType;
  error: string;

  constructor(message: string, type: DBErrorType) {
    super(message);

    this.type = type;
    this.error = errorMap.get(type) || "Server error";

    Error.captureStackTrace(this, this.constructor);
  }

  toObject(): IErrorObject {
    return { statusCode: this.type, error: this.error, message: this.message };
  }
}

export const handleErrors = (error: any): IErrorObject => {
  if (error instanceof AppError || error instanceof DBError)
    return error.toObject();

  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== "production") console.error(error);
  return { error, statusCode: 500, message: "Server error" };
};
