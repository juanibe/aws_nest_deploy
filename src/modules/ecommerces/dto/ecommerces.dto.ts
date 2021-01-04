import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetOneEcommerceInput {
  @Field()
  id: number;
}

@InputType()
export class CreateEcommerceInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  web?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Int)
  client: () => string;

  @Field(() => Int)
  city: () => string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}

@InputType()
export class UpdateEcommerceInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  web?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Int, { nullable: true })
  client?: () => string;

  @Field(() => Int, { nullable: true })
  city?: () => string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}
