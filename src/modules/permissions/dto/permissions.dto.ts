import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetOnePermissionInput {
  @Field()
  id: number;
}

@InputType()
export class CreatePermissionInput {
  @Field(() => Int)
  ecommerce: () => string;

  @Field(() => Int)
  aplication: () => string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}

@InputType()
export class UpdatePermissionInput {
  @Field(() => Int, { nullable: true })
  ecommerce?: () => string;

  @Field(() => Int, { nullable: true })
  aplication?: () => string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}
