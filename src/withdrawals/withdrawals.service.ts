import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import WithdrawalDAO, { Withdrawals } from "./dtos/withdrawals.entity";

@Injectable()
export class WithdrawalsService {
  constructor(
    @InjectModel(Withdrawals)
    private readonly withdrawalRepo: ReturnModelType<typeof WithdrawalDAO>,
  ) {}
}
