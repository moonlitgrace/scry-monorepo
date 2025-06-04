import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { AccessToken, AccessTokenPayload } from './interfaces/access-token';
import { comparePass, hashPass } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    const isMatch = await comparePass(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match!');
    }

    return user;
  }

  signIn(user: UserDocument): AccessToken {
    const payload: AccessTokenPayload = { sub: user._id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(user: SignInDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists!');
    }

    const hashedPassword = await hashPass(user.password);
    const createdUser = await this.usersService.create({
      email: user.email,
      password: hashedPassword,
    });

    return this.signIn(createdUser);
  }
}
