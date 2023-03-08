import { Module } from '@nestjs/common';
import { DepositsService } from "./deposits.service";
import { DepositsResolver } from "./deposits.resolver";
import { TypegooseModule } from "nestjs-typegoose";
import { Account } from "../accounts/entities/account.entity";
import { Deposit } from "./entities/deposit.entity";
import { Transactions } from "../transactions/entities/transactions.entity";
import {HttpService} from "../commons/shared/http.service";

@Module({
  imports: [TypegooseModule.forFeature([Account, Deposit, Transactions]), HttpService],
  providers: [DepositsService, DepositsResolver],
})
export class DepositsModule {}
