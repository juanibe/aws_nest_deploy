import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetOneCountryInput {
  @Field()
  id: number;
}

@InputType()
export class CreateCountryInput {
  @Field()
  name: string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}

@InputType()
export class UpdateCountryInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ defaultValue: true, nullable: true })
  active?: boolean;
}
