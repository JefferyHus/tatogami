import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.id);
    // throw an error if no user found
    if (!user) {
      throw new UnauthorizedException();
    }
    // return the full object
    return { id: user.id, username: user.username };
  }
}
