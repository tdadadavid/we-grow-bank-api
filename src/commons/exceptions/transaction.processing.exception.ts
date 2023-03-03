import { HttpException, HttpStatus } from "@nestjs/common";

export class TransactionProcessingException extends HttpException {
  constructor(message = "An issue occurred while processing transaction") {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
