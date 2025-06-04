import { Types } from 'mongoose';

export interface AccessToken {
  access_token: string;
}

export interface AccessTokenPayload {
  sub: Types.ObjectId;
  email: string;
}
