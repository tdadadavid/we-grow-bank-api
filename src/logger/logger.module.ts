import { Module } from "@nestjs/common";
import { WeGrowBankLogger } from "./logger.service";

@Module({
  providers: [WeGrowBankLogger],
  exports: [WeGrowBankLogger],
})
export class LoggerModule {}
