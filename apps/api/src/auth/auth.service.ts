import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  signIn(data: SignInDto) {
    return this.usersService.create(data);
  }
}
