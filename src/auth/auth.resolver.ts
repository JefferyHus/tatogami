import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register.input';
import { UserToken } from './models/user-token.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserToken)
  async login(@Args('input') input: AuthLoginInput): Promise<UserToken> {
    return await this.authService.login(input);
  }

  @Mutation(() => UserToken)
  async register(@Args('input') input: AuthRegisterInput): Promise<UserToken> {
    return await this.authService.register(input);
  }
}
