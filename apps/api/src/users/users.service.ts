import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser } from './interfaces/create-user.interface';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(data: CreateUser) {
    if (await this.userModel.exists({ email: data.email })) {
      throw new ConflictException('User already exists!');
    }

    return this.userModel.create(data);
  }
}
