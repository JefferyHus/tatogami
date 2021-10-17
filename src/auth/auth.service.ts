import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-errors';
import * as argon2 from 'argon2';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register.input';
import { UserToken } from './models/user-token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: number): Promise<User | null> {
    const user = await this.userService.findOneById(id);

    // verify the password
    if (!user) {
      return null;
    }

    return user;
  }

  async login(input: AuthLoginInput): Promise<UserToken> {
    const user = await this.userService.findOneByEmail(input.email);

    if (!user) {
      throw new ApolloError(`User with email ${input.email} does not exist`);
    }

    // validate the password
    if (!(await argon2.verify(user.password, input.password))) {
      throw new Error(`Invalid password`);
    }

    return {
      token: this.jwtService.sign({
        id: user.id,
      }),
      user,
    };
  }

  async register(input: AuthRegisterInput): Promise<UserToken> {
    const found = await this.userService.findOneByEmail(input.email);

    if (found) {
      throw new ApolloError(
        `An account with the email ${input.email} already exists.`,
      );
    }

    const password = await argon2.hash(input.password);
    const user = await this.userService.create(input.email, password);

    return {
      token: this.jwtService.sign(String(user.id)),
      user,
    };
  }
}
