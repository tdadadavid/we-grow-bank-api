import { Logger } from "winston";
import { LoggerService } from "@nestjs/common";

export class WeGrowBankLogger implements LoggerService{
  constructor(private logger: Logger){}
  error(message: any, ...optionalParams: any[]): any {
    this.logger.error({ message, ...optionalParams });
  }

  info(message: any, ...optionalParams: any[]): any {
    this.logger.info({ message, ...optionalParams });
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.logger.warn({ message, ...optionalParams });
  }

  log(message: any, ...optionalParams: any[]): any {
  }
}
