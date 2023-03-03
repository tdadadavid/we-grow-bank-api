import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { Auth } from "./entities/auth.entity";
import { CreateUserDto, UserLoginDto } from "./dto";
import { CreateUserResponseDto } from "./dto/createUserResponseDto";
import { RefreshTokenDto } from "./dto/refreshTokenDto";
import { LogOutDto } from "./dto/logOutDto";
import { LoginResponseDto } from "./dto/LoginResponseDto";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => CreateUserResponseDto)
  createUser(@Args("signUp") createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Mutation(() => LoginResponseDto)
  loginUser(@Args("signIn") loginUserDto: UserLoginDto) {
    return this.authService.login(loginUserDto);
  }

  @Mutation(() => Auth)
  refreshToken(@Args("refreshToken") refreshTokenDto: RefreshTokenDto) {
    return "implement refresh token for the user";
  }

  @Mutation(() => Auth)
  logOut(@Args("logOut") logOutDto: LogOutDto) {
    return "Implement Logout for user";
  }
}
