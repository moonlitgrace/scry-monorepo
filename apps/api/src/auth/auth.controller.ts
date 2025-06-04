import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthenticatedUser, User } from 'src/shared/decorators/user.decorator';
import { AuthService } from './auth.service';

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
