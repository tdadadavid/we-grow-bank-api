import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const statusCode = error.getStatus();
    const stacktrace = error.stack;
    const errors = error.response.errors || null;

    if (statusCode === HttpStatus.UNAUTHORIZED) {
      if (typeof error.response !== "string") {
        error.response.message =
          error.response.message ||
          "You do not have permission to access this resource";
      }
    }

    return new HttpException(error.response.message, errors, stacktrace);
  }
}
