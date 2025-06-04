import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenPayload } from 'src/auth/interfaces/access-token';

export type AuthenticatedUser = AccessTokenPayload;

export const User = createParamDecorator(
  (_, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as AuthenticatedUser;
  },
);
