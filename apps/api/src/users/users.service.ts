import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(email: string, password: string) {
    return this.userModel.create({ email, password });
  }
}
