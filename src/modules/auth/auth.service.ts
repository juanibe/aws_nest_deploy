import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { hash, compare } from 'bcrypt';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { RegisterResponse } from './responses/register.response';
import { User } from '../users/models/user.model';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getOneUser({ email });
    if (!user) throw new Error('User not found');
    const valid = await compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    return user;
  }

  async login(data: LoginInput) {
    const { email, password } = data;
    try {
      const userLoged = await this.validateUser(email, password);
      const payload = { email: userLoged.email, id: userLoged.id };
      return {
        token: this.jwtService.sign(payload),
        user: userLoged
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async register(data: RegisterInput): Promise<RegisterResponse> {
    const { password, email, firstName, lastName } = data;
    try {
      const userExist = await User.findOne({ where: { email } });
      if (userExist) return { response: 'User already exist' };
      const hashPassword = await hash(password, 12);
      const user = User.create({
        email,
        password: hashPassword,
        firstName,
        lastName
      });
      await user.save();
      return {
        response: 'User created Succesfully',
        user: user
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
