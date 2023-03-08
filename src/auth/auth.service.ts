import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import UserDAO, { User } from "src/users/entities/user.entity";
import { CreateUserDto } from "./dto";
import { PasswordService } from "./password.service";
import { ReturnValue, TokenUser } from "../commons";
import { UserLoginDto } from "./dto";
import { TokenService } from "./token.service";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import AccountDAO, { Account } from "../accounts/entities/account.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: ReturnModelType<typeof UserDAO>,
    @InjectModel(Account)
    private readonly accountRepo: ReturnModelType<typeof AccountDAO>,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnValue> {
    // check if the email is already used
    const uniqueCredentialsTaken = await this.userRepository
      .findOne({
        $or: [
          { email: createUserDto.email },
          { phoneNumber: createUserDto.phoneNumber },
        ],
      })
      .exec();

    if (uniqueCredentialsTaken)
      throw new ConflictException("Duplicate credentials provided");

    // hash user password
    const hash = await this.passwordService.encodePassword(
      createUserDto.password,
    );

    let user = User.builder()
      .setEmail(createUserDto.email)
      .setFirstname(createUserDto.firstname)
      .setLastName(createUserDto.lastname)
      .setPassword(hash)
      .setAccountNum(createUserDto.phoneNumber)
      .setPhoneNumber(createUserDto.phoneNumber);

    // create an account for the user.

    user = await this.userRepository.create(user);

    let account = Account.builder()
      .setAccountNumber(createUserDto.phoneNumber)
      .setCurrency(createUserDto.currency)
      .setOwner(user._id);

    account = await this.accountRepo.create(account);

    //TODO work on the response dto and come back for this.
    return {
      message: "User created successfully",
      data: {
        user,
        account,
      },
    };
  }

  async login(userLoginDto: UserLoginDto): Promise<ReturnValue> {
    const { email, password } = userLoginDto;
    // check for the user.
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const passwordIsEqual = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!passwordIsEqual)
      throw new UnauthorizedException("Invalid Credentials");

    // generate tokens for user.
    const userDetails: TokenUser = { id: user.id, email: user.email };
    const [
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    ]: Array<string | Date> = this.tokenService.getTokenInfo(userDetails);

    return {
      message: "Successfully done",
      data: {
        tokens: {
          accessToken,
          accessTokenExpiresAt,
          refreshToken,
          refreshTokenExpiresAt,
        },
        user,
      },
    };
  }
}
