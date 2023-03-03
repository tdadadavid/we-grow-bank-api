import { AppService } from './app.service';
import { Query, Resolver } from "@nestjs/graphql";
import { APIStatus } from "./dto";

@Resolver()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Query(() => APIStatus)
  getHello(): Record<any, any> {
    return this.appService.getHello();
  }
}
