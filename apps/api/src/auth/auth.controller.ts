import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthenticatedUser, User } from './decorators/user.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  signIn(@User() user: AuthenticatedUser) {
    return this.authService.signIn(user);
  }
}
