import { Field, InputType } from '@nestjs/graphql';
import { Length, IsEmail } from 'class-validator';

@InputType()
export class RegisterInput {
  @Length(2, 40)
  @Field()
  firstName: string;

  @Length(2, 40)
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @Length(5, 30)
  @Field()
  password: string;
}
