import { Injectable } from '@nestjs/common';
import { GetUserInput } from './dto/getUser.input';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  async getUsers(): Promise<User[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getOneUser(data: GetUserInput): Promise<User | undefined> {
    const { userId, email } = data;
    try {
      const user = await User.findOne({ where: [{ id: userId }, { email: email }] });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getUserById(userId: number): Promise<User | undefined> {
    try {
      const user = await User.findOne(userId);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
