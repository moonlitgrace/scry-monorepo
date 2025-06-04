import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  signIn(creds: SignInDto) {
    console.log(creds);
    return `User with email ${creds.email} is authenticated!`;
  }
}
