import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetOneClientInput {
  @Field()
  id: number;
}

@InputType()
export class CreateClientInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}

@InputType()
export class UpdateClientInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}
