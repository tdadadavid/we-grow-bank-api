import { HttpException, HttpStatus } from "@nestjs/common";

export class InsufficientBalanceException extends HttpException {
  constructor(message = "Transaction failed due to insufficient balance") {
    super(message, HttpStatus.NOT_FOUND);
  }
}
