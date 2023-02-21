import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dto/user.dto';
import { UserDocument, Users } from './users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users.name) private userModel: Model<UserDocument>) {}
  
  async findAll() {
    const users = await this.userModel.find();
    return { message: 'success', data: users };
  }

  async create(user: User) {
    const exists = await this.userModel.find({ email: user.email });
    if(exists.length) {
      return 'user already exists';
    }

    const newUser = await new this.userModel(user);
    newUser.save();

    return { message: 'user created successfully', data: newUser };
  }


  async update(id: string, user: User) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
    return { message: `user updated successfully`, data: updatedUser };
  }

  async remove(id: string) {
    const updated = await this.userModel.findByIdAndDelete(id);
    return { message: 'user deleted successfully' };
  }
}
