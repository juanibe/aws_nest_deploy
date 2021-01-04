import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { GetUserInput } from './dto/getUser.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from './decorators/user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getOneUser(@Args('input') data: GetUserInput): Promise<User> {
    return this.userService.getOneUser(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() user: User): Promise<User> {
    return this.userService.getUserById(user.id);
  }
}
