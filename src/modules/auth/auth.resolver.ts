import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginResponse } from './responses/login.response';
import { RegisterResponse } from './responses/register.response';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') data: LoginInput): Promise<LoginResponse> {
    return this.authService.login(data);
  }

  @Mutation(() => RegisterResponse)
  async register(@Args('input') data: RegisterInput): Promise<RegisterResponse> {
    return this.authService.register(data);
  }
}
