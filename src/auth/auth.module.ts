import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { User } from '../users/entities/user.entity';
import { TypegooseModule } from 'nestjs-typegoose';
import { TokenService } from "./token.service";
import { AuthResolver } from "./auth.resolver";
import { Account } from "../accounts/entities/account.entity";

@Module({
  imports: [TypegooseModule.forFeature([User, Account])],
  providers: [AuthService, PasswordService, User, TokenService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
