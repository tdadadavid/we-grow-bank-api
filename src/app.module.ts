import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { DepositsModule } from "./deposits/deposits.module";
import { WithdrawalsModule } from "./withdrawals/withdrawals.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import * as process from "process";
import { TypegooseModule } from "nestjs-typegoose";
import { AccountsModule } from './accounts/accounts.module';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: join(process.cwd(), "src/logs/we.grow.logs"),
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
          ),
        }),
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schemas/index.gql"),
      sortSchema: true,
      debug: true,
      playground: true,
    }),
    DepositsModule,
    WithdrawalsModule,
    TransactionsModule,
    UsersModule,
    AuthModule,
    TypegooseModule.forRoot(process.env.MONGOURI),
    AccountsModule,
    LoggerModule,
  ],
  providers: [AppService, AppController],
})
export class AppModule {}
