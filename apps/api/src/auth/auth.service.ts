import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { hashPass } from './utils';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(data: SignInDto) {
    const hashedPassword = await hashPass(data.password);
    return this.usersService.create({ email: data.email, password: hashedPassword });
  }
}
