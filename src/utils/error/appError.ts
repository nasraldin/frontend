import { logger } from '~/utils/logger';

type HttpCode =
  | 200
  | 400
  | 401
  | 403
  | 404
  | 409
  | 429
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504;

export class AppError extends Error {
  public readonly name: string;
  public readonly code: HttpCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    code: HttpCode,
    message: string,
    isOperational?: boolean,
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.code = code;
    this.isOperational = isOperational || true;

    Error.captureStackTrace(this);
  }
}

export class ErrorHandler {
  public async handleError(error: Error, res: Response): Promise<void> {
    logger.error({ error, res }, 'handleError');
  }

  public isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  public logError(error: unknown) {
    logger.error({ error }, 'ErrorHandler');
  }
}

export const errHandler = new ErrorHandler();
