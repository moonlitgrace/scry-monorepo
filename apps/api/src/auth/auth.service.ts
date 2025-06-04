import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { comparePass, hashPass } from './utils';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string) {
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

  async signIn(data: SignInDto) {
    const existingUser = await this.usersService.findOneByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists!');
    }

    const hashedPassword = await hashPass(data.password);
    return this.usersService.create({ email: data.email, password: hashedPassword });
  }
}
