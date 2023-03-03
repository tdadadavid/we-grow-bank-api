import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import UserDAO, { User } from "./entities/user.entity";
import { ReturnValue } from "../commons";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userDAO: ReturnModelType<typeof UserDAO>,
  ) {}

  async findAll(): Promise<ReturnValue> {
    const users = await this.userDAO.find();
    return {
      message: "All users",
      data: users,
    };
  }

  async findOne(id: number): Promise<ReturnValue> {
    const user = await this.userDAO.findById(id);
    if (!user) throw new NotFoundException('User with given id not found');

    return {
      message: 'User found',
      data: user,
    };
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
