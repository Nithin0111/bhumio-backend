import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { exec } from 'child_process';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : 500;
    const exceptionResponse: any = exception.getResponse
      ? exception.getResponse()
      : { error: 'Internal Server Error' };
    /**
     * prepare the custom error message
     */
    let error = exceptionResponse && exceptionResponse.error;
    if (exceptionResponse.message) {
      error = error ? error + ' => ' + exceptionResponse.message : error;
    }
    const errorResponseObject = {
      code: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      method: request.method,
      requestId: request.requestId,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message
          : exception
          ? exception.message
          : 'Internal server error',
      error,
    };
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        'ExceptionFilter',
        `${request.method} ${request.url}`,
        `${JSON.stringify(errorResponseObject)} at ${exception.stack}`,
      );
    } else {
      Logger.error(
        'ExceptionFilter',
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponseObject),
      );
    }
    response.status(status).json(errorResponseObject);
  }
}
