import { Module } from '@nestjs/common';
import { AccountsService } from "./accounts.service";
import { TypegooseModule } from "nestjs-typegoose";
import { Account } from "./entities/account.entity";

@Module({
  imports: [TypegooseModule.forFeature([Account])],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
