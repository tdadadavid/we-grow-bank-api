import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { MakeDepositDto } from "./dtos";
import { DepositsService } from "./deposits.service";
import { DepositResponseDto } from "./dtos/DepositResponseDto";

@Resolver("Deposits")
export class DepositsResolver {
  constructor(private readonly depositService: DepositsService) {}

  @Mutation(() => DepositResponseDto)
  makeDeposit(@Args("makeDeposit") depositDto: MakeDepositDto){
    return this.depositService.makeDeposit(depositDto);
  }

}
