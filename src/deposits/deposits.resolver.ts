import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { MakeDepositDto } from "./dtos";
import { DepositsService } from "./deposits.service";
import { DepositResponseDto } from "./dtos/DepositResponseDto";
import { ReturnValue } from "../commons";

@Resolver("Deposits")
export class DepositsResolver {
  constructor(private readonly depositService: DepositsService) {}

  @Mutation(() => DepositResponseDto)
  makeDeposit(
    @Args("makeDeposit") depositDto: MakeDepositDto,
  ): Promise<ReturnValue> {
    return this.depositService.makeDeposit(depositDto);
  }
}
