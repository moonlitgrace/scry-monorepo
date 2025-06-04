import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AccessToken, AccessTokenPayload } from './interfaces/access-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<AccessTokenPayload> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new BadRequestException('User not found!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match!');

    return {
      sub: user._id,
      email: user.email,
    };
  }

  signIn(user: AccessTokenPayload): AccessToken {
    return { access_token: this.jwtService.sign(user) };
  }

  async signUp(email: string, password: string): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.usersService.create(email, hashedPassword);

    return this.signIn({
      sub: createdUser._id,
      email: createdUser.email,
    });
  }
}
