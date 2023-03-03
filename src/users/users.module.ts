import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import UserDAO, { User } from './entities/user.entity';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [
    UsersResolver,
    UsersService,
    User
  ],
})
export class UsersModule {}
