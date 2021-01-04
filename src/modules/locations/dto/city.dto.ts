import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetOneCityInput {
  @Field()
  id: number;
}

@InputType()
export class CreateCityInput {
  @Field()
  name: string;

  @Field()
  postCode: string;

  @Field(() => Int)
  country: () => string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}

@InputType()
export class UpdateCityInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  postCode: string;

  @Field(() => Int, { nullable: true })
  country?: () => string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}
