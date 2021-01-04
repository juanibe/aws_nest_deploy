import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class RegisterResponse {
  @Field()
  response: string;

  @Field({ nullable: true })
  user?: User;
}
