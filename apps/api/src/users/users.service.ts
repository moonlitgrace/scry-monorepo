import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser } from './interfaces/create-user.interface';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(data: CreateUser) {
    return this.userModel.create(data);
  }
}
