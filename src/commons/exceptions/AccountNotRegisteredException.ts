import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountNotRegisteredException extends HttpException {
  constructor(message = "No account tied to the number") {
    super(message, HttpStatus.NOT_FOUND);
  }
}
